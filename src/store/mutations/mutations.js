

export default {
    SET_LIBRARY_TO_STATE: (state, res) => {
        state.library = res;
      },
      ADD_BOOK_TO_STATE: (state, book) => {
        if (!state.busket.length) return state.busket.push({...book, count: 1});
        const existedBook = state.busket.find(x => x.article === book.article);
        if (existedBook) return existedBook.count++;
        state.busket.push({...book, count: 1});
        
      },
      DELETE_BOOK_FROM_BUSKET: (state, index) => {
        state.busket.splice(index, 1)
      },
      DECREMENT_COUNT: (state, index) => {
        
        if (state.busket[index]['count'] > 1) {
          state.busket[index]['count'] -= 1;
        } else {
          return
        }
        
      },
      INCREMENT_COUNT: (state, index) => {
        if (state.busket[index]['count'] > -1) {
          state.busket[index]['count'] += 1;
        } else {
          return
        }
      },
      CHANGE_LIBRARY: (state, author) => {
        state.library.filter(item => item.author === author)
      },
      SET_CREATED_BOOK: (state, book) => {
        state.createdBook.push(book);
        console.log('1');
      },
      LOAD_CREATED_BOOK: (state, book) => {
        state.createdBook.push(book);
        state.createdBook = state.createdBook.reduce((o, i) => {
          if (!o.find(v => v.id == i.id)) {
            o.push(i)
          }
          return o;
        }, []);
      },
      DELETE_BOOK_FROM_CREATED: (state, index) => {
        state.createdBook.splice(index, 1);
      },
      SET_SEARCH_VALUE: (state, search) => {
        state.searchValue = search;
      },
      RESET: (state) => {
        state.searchValue = ''
      },
      EDITING_BOOK: (state, book) => {
        state.createdBook.splice(book.id, 1, book)
      }
}