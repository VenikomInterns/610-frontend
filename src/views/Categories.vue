<template>
    <div>
        <table>
            <tr>
                <th>Category Name</th>
            </tr>
            <tr v-for="category in categoriesList" :key="category.id">
                <td>
                    <button @click="showProducts(category.id)">
                        {{ category.name }}
                    </button>
                </td>
            </tr>
        </table>
        <div v-if="productsList">
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
                    <th>
                    </th>
                </tr>
                <tr v-for="(product, index) in productsList.products" :key="product.id">
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
                        {{ productsList.name }}
                    </td>
                    <td>
                        <button @click="showProduct(product.id)">
                            Show
                        </button>
                    </td>
                    <td>
                        <button @click="addToShoppingCart(product.id)">
                            Add to Shopping Cart
                        </button>
                    </td>
                </tr>
            </table>
        </div>
        <div v-if="selectedProduct">
            <div>
                <label>Product Name</label>
                {{ selectedProduct.name }}
            </div>
            <div>
                <label>Price:</label>
                {{ selectedProduct.price }}
            </div>
            <div>
                <label>Description:</label>
                {{ selectedProduct.description }}
            </div>
            <div>
                <label>Category:</label>
                {{ selectedProduct.category.name }}
            </div>
            <div class="mt-4">
                <label>Product Image</label>
                <div v-for="image in selectedProduct.images" :key="image.id">
                    <img v-if="image.path.charAt(0) === 'd' " :src="image.path"/>
                    <img v-if="image.path.charAt(0) !== 'd' "
                         :src="'http://127.0.0.1:8000/storage/'+image.path"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import axios, * as others from 'axios';
    import ShoppingCart from "@/views/ShoppingCart";

    export default {
        name: 'Categories',
        components: {ShoppingCart},
        data() {
            return {
                categoriesList: '',
                productsList: '',
                selectedProduct: '',
                heartList: []
            }
        },
        created() {
            axios.get('http://127.0.0.1:8000/api/categories')
                .then((response) => {
                    this.categoriesList = response.data.data;
                });

            if(localStorage.getItem("favouriteList")) {
                this.heartList = JSON.parse(localStorage.getItem("favouriteList"));
            }
        },
        methods: {
            showProducts(categoryId) {
                axios.get('http://127.0.0.1:8000/api/categories/' + categoryId)
                    .then((response) => {
                        this.productsList = response.data.data;
                    });
            },

            showProduct(productId) {
                axios.get('http://127.0.0.1:8000/api/products/' + productId)
                    .then((response) => {
                        this.selectedProduct = response.data.data;
                    });
            },

            async addToShoppingCart(productId) {
                const product = await axios.get('http://127.0.0.1:8000/api/products/' + productId)
                    .then((response) => response.data.data);

                const isFound = this.heartList.some(itemProduct => {
                    if (itemProduct.id === product.id) {
                        return true;
                    }
                });

                if(!isFound){
                    this.heartList.push(product);
                    localStorage.setItem("favouriteList", JSON.stringify(this.heartList));
                }

                await this.$router.push('shopping-cart');
            }
        }
    }
</script>
