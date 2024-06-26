import React, { useState, useEffect, useRef } from 'react';
import { compose } from 'redux';
import { Portal } from 'react-portal';
import { connect, useSelector } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import cx from 'classnames';

import BasketPopup from './BasketPopup';
import basketSVG from '@eeacms/volto-favboard/icons/basket.svg';

import './style.less';

const BasketButton = (props) => {
  const { basket } = props;
  const logedIn = useSelector(
    (state) =>
      state.userSession.token !== undefined && state.userSession.token !== null,
  );

  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const outsideClick = (e) => {
      if (showMenu && menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', outsideClick);
    return () => {
      document.removeEventListener('mousedown', outsideClick);
    };
  }, [showMenu]);

  return (
    <>
      {logedIn && (
        <Portal node={__CLIENT__ && document.querySelector('.basket')}>
          <div className="fav-basket-menu" ref={menuRef} role={'listbox'}>
            <Button
              className={cx('basket-btn item', {
                'full-basket': basket.items && basket.items.length > 0,
              })}
              onClick={() => {
                setShowMenu(!showMenu);
              }}
              title="Boards basket"
            >
              <Icon name={basketSVG} size="30px" />

              {basket.items && basket.items.length > 0 && (
                <div className="basket-count">
                  <span>{basket.items.length}</span>
                </div>
              )}
            </Button>

            {showMenu ? <BasketPopup /> : null}
          </div>
        </Portal>
      )}
    </>
  );
};

export default compose(
  connect((state) => ({
    basket: state.basket,
  })),
)(BasketButton);
