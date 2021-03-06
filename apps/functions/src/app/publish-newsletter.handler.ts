import {PendingLink, PublishNewsletterRequest} from '@foxy-news/links';
import {Newsletter} from '@foxy-news/newsletters';

export const publishNewsletterHandler = (
  functions: import('firebase-functions').FunctionBuilder,
  firebase: typeof import('firebase-admin')) => functions.https.onCall(
  async (data: PublishNewsletterRequest, context) => {
    if (!context.auth.uid) {
      console.error(`Authentication required to publish newsletter`);
      return;
    }

    const firestore = firebase.firestore();
    await firestore.runTransaction(async trn => {
      const linksCollection = firestore.collection(`/team/${data.team}/field/${data.field}/link`);
      const newsletterCollection = firestore.collection(`/team/${data.team}/field/${data.field}/newsletter`);
      const links = await trn.get(linksCollection.where('newsletter', '==', data.newsletter));

      const newsletter: Newsletter = {
        date: data.date,
        title: data.title,
        description: data.description,
        links: links.docs
          .map(doc => doc.data() as PendingLink)
          .map(link => ({
            ...link.data
          }))
      };

      trn.create(newsletterCollection.doc(), newsletter);
      links.forEach(link => trn.delete(linksCollection.doc(link.id)));
    });
  }
);
