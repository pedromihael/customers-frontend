import React from 'react';
import { MdNotifications } from 'react-icons/md';
import ReactTooltip from 'react-tooltip';
import { Search, Switch } from '../../../modules/components';
import { Container } from './styles';
import { Link } from 'react-router-dom';
import { useABTest } from '../../../state/hooks/useABTest';

interface Props {
  text: string;
  toggleTheme(): void;
  showSearchBar?: boolean;
}

const Header: React.FC<Props> = ({
  text,
  toggleTheme,
  showSearchBar = true,
}) => {
  const handleClick = useABTest();
  return (
    <Container>
      <Link to="/">
        <h1>{text}</h1>
      </Link>
      <section>
        <Switch toggleTheme={toggleTheme} />
        <div
          className="notifications-icon"
          onClick={() =>
            handleClick('notifications', window.navigator.userAgent)
          }
        >
          <MdNotifications
            data-tip={`We're testing a new feature. \n Would you like to see notifications here? \nJust click and help us!`}
            size="2rem"
          />
          {/* <ReactTooltip place="bottom" multiline={true} type="dark" effect="float" /> */}
          <div className="badge">6</div>
        </div>
        {showSearchBar && <Search className="search" text="Searching for..." />}
      </section>
    </Container>
  );
};

export default Header;
