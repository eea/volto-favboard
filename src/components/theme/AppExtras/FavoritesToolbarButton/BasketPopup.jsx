import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { compose } from 'redux';
import { Button, Input } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import { groupBy } from 'lodash';
import jwtDecode from 'jwt-decode';
import {
  addBookmark,
  getAllBookmarks,
} from '@eeacms/volto-favboard/actions/boards';
import { removeItemFromBasket } from '@eeacms/volto-favboard/actions/basket';

import clearSVG from '@plone/volto/icons/clear.svg';
import starSVG from '@plone/volto/icons/star.svg';
import halfStarSVG from '@plone/volto/icons/half-star.svg';
import checkSVG from '@plone/volto/icons/check.svg';
import cx from 'classnames';
import './style.less';

const BasketPopup = (props) => {
  const { basket, items, userId } = props;
  const itemsInBasket = basket && basket.items.length > 0;
  const dispatch = useDispatch();

  const [activeGroup, setActiveGroup] = useState('');
  const [boardTitle, setBoardTitle] = useState('Default');
  const [boardCreated, setBoardCreated] = useState(false);
  const [groupedItems, setGroupedItems] = useState({});

  useEffect(() => {
    dispatch(getAllBookmarks(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (itemsInBasket) setActiveGroup('');
  }, [itemsInBasket]);

  useEffect(() => {
    const favItems = groupBy(items, (item) => item['owner']);

    Object.keys(favItems).forEach((item) => {
      if (item !== userId) {
        return false;
      }
      const items = favItems[item].filter((item) => item.owner === userId);
      const byGroups = groupBy(items, (item) => item['group']);
      setGroupedItems({ [item]: byGroups });
    });
  }, [items, userId]);

  const handleCreateBoard = () => {
    for (let item of basket.items) {
      const { content } = item;
      dispatch(
        addBookmark(content.UID, boardTitle, item.hash || '', {
          status: 'private',
          data: content,
        }),
      );
      dispatch(removeItemFromBasket(content));
      setBoardCreated(true);
      setBoardTitle('Default');
    }
  };

  const handleSaveToBoard = (group) => {
    for (let item of basket.items) {
      const { content } = item;
      dispatch(
        addBookmark(content.UID, group, item.hash || '', {
          status: 'private',
          data: content,
        }),
      );
      setActiveGroup('');
      setTimeout(() => setActiveGroup(''), 2000);
      dispatch(removeItemFromBasket(content));
    }
  };

  return (
    <div className="fav-menu pastanaga-menu">
      {/* <header>
        <h2>Boards basket</h2>
      </header> */}
      <div className="fav-menu-content">
        <div className="fav-boards-list">
          <div className="basket-menu-title">Selected items: </div>
          {itemsInBasket ? (
            <ul className="fav-menu-listing">
              {basket.items.map((item, i) => (
                <li
                  className="fav-menu-list-item"
                  key={item['@id']}
                  title={item.content.title}
                >
                  <span className="fav-item-title">{item.content.title}</span>
                  <Button
                    className="remove-pin-btn"
                    title="Remove favorite"
                    onClick={() => {
                      dispatch(removeItemFromBasket(item.content));
                    }}
                  >
                    <Icon name={clearSVG} size="20px" />
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="fav-menu-info">
              No items selected. Use the
              <span className="star-icon">
                <Icon name={halfStarSVG} size="19px" />
              </span>
              button to save items in boards.
            </div>
          )}
        </div>

        {groupedItems && Object.keys(groupedItems).length > 0 && (
          <div className="fav-boards-list">
            <div className="basket-menu-title">Save to an existing board:</div>

            {Object.keys(groupedItems).map((user) => {
              return (
                <ul className="boards-list">
                  {Object.keys(groupedItems[user])
                    .sort()
                    .map((group, index) => {
                      return (
                        <li
                          role="presentation"
                          key={index}
                          className={cx('board-item', {
                            active: activeGroup === group,
                            boarditems: basket.items.length > 0,
                          })}
                          onClick={() => {
                            if (itemsInBasket) {
                              handleSaveToBoard(group);
                              setActiveGroup(group);
                            }
                          }}
                          onKeyDown={() => {
                            if (itemsInBasket) {
                              handleSaveToBoard(group);
                              setActiveGroup(group);
                            }
                          }}
                        >
                          <div className="boards-wrapper">
                            <Icon name={starSVG} size="16px" />
                            {group}
                            {/*({groupedItems[user][group].length})*/}
                            {activeGroup === group && (
                              <Icon
                                className="check-icon"
                                name={checkSVG}
                                size="16px"
                              />
                            )}
                          </div>
                          <div className="add-btn-wrapper">
                            <div className="add-btn">Save</div>
                          </div>
                        </li>
                      );
                    })}
                </ul>
              );
            })}
          </div>
        )}

        <div className="fav-group-title">
          <div className="basket-menu-title">Create a new board:</div>

          {/* <Grid>
            <Grid.Row>
              <Grid.Column width={3}>
                <label htmlFor="field-title">Name</label>
              </Grid.Column>

              <Grid.Column width={9}></Grid.Column>
            </Grid.Row>
          </Grid> */}

          <Input
            id="field-title"
            name="title"
            type="text"
            value={boardTitle}
            onChange={(e) => setBoardTitle(e.target.value)}
          />

          {boardCreated && <p className="board-created-info">Board created.</p>}

          <Button
            size="mini"
            className="fav-board-save"
            disabled={basket.items.length === 0}
            onClick={handleCreateBoard}
          >
            Create
          </Button>
        </div>
      </div>
    </div>
  );
};

export default compose(
  connect(
    (state) => ({
      userId: state.userSession.token
        ? jwtDecode(state.userSession.token).sub
        : '',
      basket: state.basket,
      items: state.boards?.items || [],
    }),
    { removeItemFromBasket },
  ),
)(BasketPopup);
