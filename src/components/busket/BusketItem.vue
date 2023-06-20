<template>
    <div>
        <div class="busket-item_wrapper mb-4 mt-4">
            <div class="busket-item_product">
                <h3>Наименование товара</h3>
                <div class="product-info">
                    <img 
                        class="book-img" 
                        alt="book"
                        :src="(`${busket.image}`)"
                    >
                    <div class="product-info_wrapper">
                        <div class="book-title">{{ busket.title }}</div>
                    </div>
                </div>
            </div>
            <div class="busket-item_price">
                <h3>Цена</h3>
                <div class="item-price">{{ busket.price }}.00 руб.</div>
            </div>
            <div class="busket-item_count">
                <h3>Количество</h3>
                <div class="item-count_wrapper">
                    <div 
                        max-width="10px" 
                        style="cursor:pointer"
                        @click="this.$emit('decrement')"
                    >   
                        -
                    </div>
                    <div class="item-count">{{ busket.count }} шт.</div>
                    <div 
                        width="10px" 
                        style="cursor:pointer"
                        @click="this.$emit('increment')"
                    >
                        +
                    </div>
                </div>
                
            </div>
            <div class="busket-item_total-price">
                <h3>Стоимость</h3>
                <div class="total-price">{{ busket.price * busket.count }}.00руб.</div>
            </div>
            <div class="remove_item">
                <v-btn
                    @click="this.$emit('deleteFromBasket')"
                    class="btn_remove"
                     icon="$close" 
                     variant="text">
                </v-btn>
            </div>
            
        </div>
    </div>
</template>

<script>

    export default {
       name: 'BusketItem',
       data() {
        return {
                  
            }
       },
       props: {
        busket: {
            type: Object,
            default: () => {}
        }
       }
       
       
    }
</script>

<style scoped>
    .book-img {
        max-width: 70px;
    }
    .busket-item_wrapper {
        display: grid;
        grid-template-columns: 1.5fr 1fr 1fr 1fr .5fr;
        padding: 20px;
        border: 1px solid rgba(0, 0, 0, .2);
        border-radius: 5px;
    }
    .product-info {
        padding: 10px;
        display: flex;
        align-items: center;
        
    }
    .product-info_wrapper {
        color: rgba(0, 0, 0, .7);
        margin-left: 25px;
    }
    .remove_item {
        text-align: right;
        position: relative;
    }
    .btn_remove {
        position: absolute;
        margin-left: -27px;
        margin-top: -20px;
    }
   
    .item-count_wrapper {
        max-width: 150px;
        margin: 0 auto;
        padding-top: 20%;
        display: grid;
        grid-template-columns: .5fr .5fr .5fr;
        align-items: center;
        justify-content: center;
        text-align: center;
    }
    .busket-item_count {
        text-align: center;
      
    }
    .busket-item_price {
        text-align: center;
    }
    .busket-item_total-price {
        text-align: center;
    }
    .total-price {
        padding-top: 19%;
    }
    .item-price {
        padding-top: 20%;
    }
</style>