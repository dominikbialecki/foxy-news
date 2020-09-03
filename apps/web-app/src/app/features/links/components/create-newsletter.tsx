import {PendingLink} from '@foxy-news/links';
import {Button, Card, CardActions, CardContent, TextField as MaterialTextField} from '@material-ui/core';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import React, {useState} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import styled from 'styled-components';
import {AppState} from '../../../state/app-state';
import {addLinkToNewsletterAction} from '../state/add-link-to-newsletter/add-link-to-newsletter.action';
import {NewsletterDraft} from '../state/newsletter-draft';
import {publishNewsletterAction} from '../state/publish-newsletter/publish-newsletter.action';
import {LinkSummary} from './link-summary';

const StyledCard = styled(Card)`
    width: 100%;
    margin-bottom: 16px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 800px;
  margin: 32px auto;
`

const TextField = styled(MaterialTextField)`
  margin-bottom: 8px;
`;

const Spacer = styled.div`
  flex: 1;
`;

const emptyDraft = {
  description: '',
  title: '',
  date: ''
};

const CreateNewsletterView = ({newsletter, removeFromDraft, publish}: ViewProps) => {
  const [draft, setDraft] = useState(emptyDraft);
  const onChange = (key: keyof NewsletterDraft, value: string) => setDraft({
    ...draft,
    [key]: value
  });
  return <Container>
    <StyledCard>
      <CardContent>
        <TextField fullWidth
                   value={draft.title}
                   onChange={event => onChange('title', event.target.value)}
                   placeholder={'Newsletter title, eg. Consdata Tech 34/2020'}/>
        <TextField fullWidth
                   multiline
                   value={draft.description}
                   onChange={event => onChange('description', event.target.value)}
                   placeholder={'Summary newsletter description'}/>
        <TextField fullWidth
                   value={draft.date}
                   onChange={event => onChange('date', event.target.value)}
                   placeholder={'Publication date, eg. 2020/08/31'}/>
      </CardContent>
      <CardActions>
        <Button size="small"
                color="secondary"
                onClick={() => publish(draft.title, draft.description, draft.date)}>
          Opublikuj
        </Button>
      </CardActions>
    </StyledCard>
    <hr/>
    {newsletter?.links?.map(link => <StyledCard key={link.id}>
      <CardContent>
        <LinkSummary link={link}/>
      </CardContent>
      <CardActions>
        <Spacer/>
        <Button size="small" color="primary" onClick={() => removeFromDraft(link)}>
          <DeleteOutlineOutlinedIcon/>
        </Button>
      </CardActions>
    </StyledCard>)}
  </Container>;
}

interface ViewProps extends ConnectedProps<typeof connector> {
}

const connector = connect(
  (state: AppState) => ({
    newsletter: state.links.newsletter
  }),
  {
    removeFromDraft: (link: PendingLink) => addLinkToNewsletterAction({link, newsletter: ''}),
    publish: (title: string, description: string, date: string) => publishNewsletterAction({title, description, date})
  }
);

export const CreateNewsletter = connector(CreateNewsletterView);

