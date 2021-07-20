import { Box, Button, ButtonRow, H, Page, TitleRow } from '../../../../ui';
import Header from './Header';

const Setup = () => {
  return (
    <>
      <Header />
      <Page>
        <H l={1} compact>Setup</H>
        <Box>
          <TitleRow>
            <H l={2} compact>Collections</H>
            <ButtonRow compact>
              <Button>New</Button>
            </ButtonRow>
          </TitleRow>
        </Box>
      </Page>
    </>
  );
};

export default Setup;
