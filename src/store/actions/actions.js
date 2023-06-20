import axios from "axios";

export default {
    async GET_BOOK_FROM_API({commit}) {
        try {
          await axios.get('http://localhost:3000/books')
          .then(res => {
            commit('SET_LIBRARY_TO_STATE', res.data)
            return res;
          })
        } catch(e) {
          console.log(e);
          return e;
        }
      },
      ADD_TO_BUSKET({commit}, book) {
        commit('ADD_BOOK_TO_STATE', book)
      },
      REMOVE_FROM_BUSKET({commit}, index) {
        commit('DELETE_BOOK_FROM_BUSKET', index)
      },
      DECREMENT_BUSKET({commit}, index) {
        commit('DECREMENT_COUNT', index)
      },
      INCREMENT_BUSKET({commit}, index) {
        commit('INCREMENT_COUNT', index)
      },
      SORT_LIBRARY({commit}, author) {
        commit('CHANGE_LIBRARY', author)
      },

      async POST_CREATED_BOOK({commit}, book) {
        try {
          await axios.post('http://localhost:3000/createdBook', {
            title: book.title,
            image: book.image,
            genre: book.genre,
            author: book.author,
            publish_year: book.publish_year,
            price: book.price
          })
          .then(res => {
            commit('SET_CREATED_BOOK', res.data)
          })
        } catch(e) {
          console.log(e);
        }
      },
      async DELETE_CREATED_BOOK({commit}, index) {
        try {
          await axios.delete(`http://localhost:3000/createdBook/${index + 1}`)
            .then(res => {
              commit('DELETE_BOOK_FROM_CREATED', index)
            })
        } catch(e) {
          return e
        }
      },
      async GET_CREATED_BOOK({commit}) {
       try {
        await axios.get('http://localhost:3000/createdBook')
        .then(res => {
          if (res.data.length > 0) {
            res.data.forEach(item => {
              commit('LOAD_CREATED_BOOK', item)
            })
            
          }
          return res.data;
          
        })
       }  catch(e) {
        return e
       }
      },
      GET_SEARCH_VALUE({commit}, search) {
        commit('SET_SEARCH_VALUE', search)
      },
      RESET_SEARCH_VALUE({commit}) {
        commit('RESET')
      },
      async SET_EDITING_BOOK({commit}, book) {
        try {
          console.log(book.id);
          await axios.patch(`http://localhost:3000/createdBook/${book.id}`, {
            title: book.title,
            author: book.author,
            genre: book.genre,
            image: book.image,
            price: book.price,
            publish_year: book.publish_year,
            id: book.id
          })
          .then(res => {
            console.log(res);
            commit('EDITING_BOOK', book)
          })
        } catch(e) {

        }
        
      }

}