/* eslint-disable */
<template>
<div id="listville"> <h1> Liste des villes </h1>
<div  class="row" >
    <div class="col-md-4 col-3 my-1" v-for="(vil) in villes" :key="vil.villeID">
        <div class="card h-60 mb-4">
          <div >
            <span class="card-title">{{ vil.villeNom }}</span>
          </div>
          <div class="card-action">
            <a>
              <router-link :to="{name: 'Endroit', params: {ville: vil}}">
                <img name="see" id="see"
                  src="../assets//oeil.png"/>
                </router-link>
            </a>
          </div>
        </div>
    </div>
</div>
</div>
</template>
/* eslint-disable */

<script>
/* eslint-disable */
import axios from "axios";
import router from "../router";
export default {
  props: ["categorie"],
  data() {
    return {
      villes: [],
    };
  },
  created: function() {
    this.fetchItems();
    
  },

  methods: {
    fetchItems() {
       console.log(this.categorie.categorieID)
      let uri ="http://localhost:8080/api/usersville/"+ this.categorie.categorieID;
     axios.get(uri)
     .then(resp => {
      this.villes = resp.data.Ville;
      console.log(this.categorie);
     });
    },
  }
};
</script>

<style scoped>


div {
  background: #0c0202;
  background: rgb(69,170,184) url() repeat top left;
}

#see{
  height: 50px;
  width: 50px;
}



</style>