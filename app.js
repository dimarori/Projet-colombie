Vue.component ("composant", {
    template:'<div> contenu du composant</div>'
})

var app = new Vue ({

    /* liason vers l'ID APP */
        el: '#app',
         /* j'appelle mon composant avec le nom  */
        template :"<div> voici mon composant <composant></composant></div>", 
        data:
        {
        message:'Hello Vue!',
        lien: 'https://www.ecam.be',
        mycolor:'green',
        mysize: '20pt',
        seen: false,
        todos :[
            {text: 'apprendre java'},
            {text: 'apprendre vue'},
            {text: 'creer d choses genail'}
        ]

        },
        /* changer le message, remplace this vatu dire cet objet 
        methods :{
            changemessage: function(){
                this.message = 'HELLO WORLD'
            }
        }*/
})
<template>
    <div>
        <h1>Items</h1>

        <div class="row">
          <div class="col-md-10"></div>
          <div class="col-md-2">
            <router-link to="/item" class="btn btn-primary">Create Item</router-link>
          </div>
        </div><br />

        <table class="table table-hover">
            <thead>
            <tr>
                <td>ID</td>
                <td>Item Name</td>
                <td>Item Price</td>
                <td>Actions</td>
            </tr>
            </thead>

            <tbody>
                <tr v-for="(item,index) in items" :key="item._id">
                    <td>{{ item._id }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.price }}</td>
                    <td><router-link :to="{name: 'EditItem', params: { id: item._id }}" class="btn btn-primary">Edit</router-link></td>
                    <td><button class="btn btn-danger" v-on:click="deleteItem(item._id,index )">Delete</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
