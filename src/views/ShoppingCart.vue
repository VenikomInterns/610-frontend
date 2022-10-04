<template>
    <div>
        <table>
            <tr>
                <th>
                    #
                </th>
                <th>
                    Name
                </th>
                <th>
                    Price
                </th>
                <th>
                    Description
                </th>
                <th>
                    Category
                </th>
                <th>
                </th>
            </tr>
            <tr v-for="(product, index) in heartList" :key="product.id">
                <td>
                    {{ index+1 }}
                </td>
                <td>
                    {{ product.name }}
                </td>
                <td>
                    {{ product.price }}
                </td>
                <td>
                    {{ product.description }}
                </td>
                <td>
                    {{ product.category_id }}
                </td>
                <td>
                    <button @click="removeFromShoppingCart(index)">
                        Remove from Shopping Cart
                    </button>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    import Vue from 'vue';

    export default {
        name: 'ShoppingCart',
        data() {
            return {
                heartList: JSON.parse(localStorage.getItem("favouriteList"))
            }
        },
        methods: {
            removeFromShoppingCart(index) {
                Vue.delete(this.heartList, index)
                localStorage.setItem("favouriteList", JSON.stringify(this.heartList));
            }
        }//try to use vue 3 syntax everywhere
    }
</script>