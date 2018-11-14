import { connect } from 'react-redux';
import ModalCard from '../components/ModalCard';

import {
  getCard,
  getList,
  getCommentsByCardId,
} from '../helpers';

import { setCardTitle, setCardDesc } from '../reducers/cards';
import { addComment, removeComment, setCommentText } from '../reducers/comments';

const mapStateToProps = (
  {
    lists,
    cards,
    comments,
    username,
  },
  { activeCardId },
) => {
  const {
    title, author, desc, listId,
  } = getCard(activeCardId, cards);

  const { title: listTitle } = getList(listId, lists);

  return {
    desc,
    title,
    author,
    username,
    listTitle,
    comments: getCommentsByCardId(activeCardId, comments),
  };
};

const mapDispatchToProps = (dispatch, { activeCardId: id }) => ({
  setCardTitle: title => dispatch(setCardTitle({ id, title })),
  setCardDesc: desc => dispatch(setCardDesc({ id, desc })),
  addComment: comment => dispatch(addComment({ cardId: id, ...comment })),
  removeComment: commentId => dispatch(removeComment(commentId)),
  setCommentText: comment => dispatch(setCommentText(comment)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalCard);
