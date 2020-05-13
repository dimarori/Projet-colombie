/* eslint-disable */
<template>
<div id="listendroit"> <h1> Liste des regions </h1>
<div  class="row" >
    <div class="col-md-4 col-3 my-1" v-for="(cat) in categories" :key="cat.categorieID">
        <div class="card h-100 mb-4">
          <div class="image">
              <router-link :to="{name: 'Ville', params: {categorie: cat}}">
                <img name="see" id="see"
                  src="../assets//oeil.png"/>
                </router-link>
            </div>
            <div class="card-inner">
                <div class="titre">
                    <h2>
                   <a>{{cat.categorieNom}}</a>
                    </h2>
            </div>
            <div class="content">
            </div>
          </div>
        </div>
    </div>
</div>
</div>
</template>
/* eslint-disable */

<script>
/* eslint-disable */
import axios from 'axios'
export default {
  data() {
    return {
      categories: [],  
    };
  },

  created: function() {
    this.fetchItems();
  },

  methods: {
    fetchItems() {
     let uri = "http://localhost:8080/api/users/";
      axios.get(uri)
      .then(response => {
        console.log(response.data.users)
       this.categories = response.data.users
       }
       );
    }
  },
};

</script>

<style scoped>
#cat{
  max-height: 200px;
}


div {
  background: #0c0202;
  background: rgb(69,170,184) url() repeat top left;
}

.card {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
        transition: all 0.2s ease-in-out;
        box-sizing: border-box;
        margin-top: 10px;
        margin-bottom: 10px;
        background-color: #FFF;
        text-align: center;      
}

.card:hover {
  opacity: 0.7;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.19), 0 10px 10px rgba(0, 0, 0, 0.23);
}


#mid:hover {
  opacity: 2;
}


.card > .card-inner {
  padding: 10px;
}

.card .header h2,
h3 {
  margin-bottom: 0px;
  margin-top: 0px;
}

.card .header {
  margin-bottom: 5px;
}

#titre {
  font-weight: bold;
  margin-top: 1%;
  font-size: 20px;
}
#see{
  height: 50px;
  width: 50px;
}
</style>