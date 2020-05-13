/* eslint-disable */
<template>
<div id="listendroit"> <h1> Liste d'endroits </h1>
<div  class="row" >
    <div class="col-md-4 col-3 my-1" v-for="(end) in endroits" :key="end.endroitID">
        <div class="card h-100 mb-4">
            <div class="card-inner">
                <div class="header">
                    <h2>
                   <a>{{end.endroitnom}}</a>
                    </h2>
            </div>
            <div class="content">
            </div>
          </div>
        </div>
    </div>
</div>
  <footer>
    <a id="collection-button" name="collection-button">
          <img style="max-width: 70px; max-height: 100px;" src="../assets/ajouter.png" v-on:click="ajouter()"/>
        </a>
  </footer>
</div>
</template>
/* eslint-disable */

<script>
/* eslint-disable */
import axios from 'axios'
import router from '../router'
import endroitAdd from "./endroitAdd";
export default {
  props: ["ville"],
data() {
    return {
      endroits: [], 
    };
  },

  created: function() {
    this.fetchItems();
  },

methods: {
    fetchItems() {
     console.log(this.ville.villeID)
      let uri = "http://localhost:8080/api/usersendroit/" + this.ville.villeID;
      axios.get(uri)
      .then(resp => {
       this.endroits= resp.data.Endroit
      });
    },
    ajouter() {
        this.$modal.show(
        endroitAdd,
        {
          id: this.ville.villeID
        },
        {
          draggable: true
        },
        {
        'closed': (event) => { let uri =
        "http://localhost:8080/api/usersendroit/" + this.ville.villeID;
      axios.get(uri).then(response => {
        this.endroits = response.data.Endroit;
        console.log(this.endroits);
      });}
      }
    );
  },
}
};
</script>

<style scoped>
#end{
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