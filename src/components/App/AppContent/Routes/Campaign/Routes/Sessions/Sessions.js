import { useParams, Redirect } from 'react-router-dom';

import { useCampaign } from '../../../../../../../hooks';
import SessionsHome from './SessionsHome';
import Session from './Session';

const Sessions = () => {
  const { key, sessions } = useCampaign();
  const { sessionId } = useParams();

  const session = sessions.find(({ id }) => id === sessionId);

  if (sessionId && !session) {
    return <Redirect to={`/campaign/${key}/sessions`} />;
  }

  if (sessionId) {
    return session
      ? <Session session={session} />
      : <Redirect to={`/campaign/${key}/sessions`} />;
  }

  return <SessionsHome />;
};

export default Sessions;
