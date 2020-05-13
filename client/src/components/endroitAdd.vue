<template>
  <div class="container">
    <h1 id="titre">Create Endroit</h1>
    <form v-on:submit.prevent="addendroit"  id="coll" name="coll" >
      <div>
        <label>Nom Endroit</label>
        <input type="text" class="form-control col-md-10 ml-5" name="nom" v-model="nom" />
      </div>
      <br />
      <div class="form-group">
        <button class="btn btn-primary"  @click="$emit('close')">Additione endroit</button>
      </div>
    </form>
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
import router from "../router";
export default {
    props: ['id','end'],
    data(){
        return{
            nom: '',
        };
    },
    methods: {
      addendroit(){
        const endData = {
            villeID: this.id,
            nom : this.nom,
        }
        //console.log(this.id)
         axios.post('http://localhost:8080/api/usersville', endData).then((response) => {
        console.log(response)
         })
    },
    }
}

</script>

<style>
.container{
    text-align: center;
}
input[type=text], select, textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}

label {
  padding: 12px 12px 12px 0;
  display: inline-block;
}

input[type=submit] {
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  float: right;
}

input[type=submit]:hover {
  background-color: #45a049;
}

.container {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}

.col-25 {
  float: left;
  width: 25%;
  margin-top: 6px;
}

.col-75 {
  float: left;
  width: 75%;
  margin-top: 6px;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}
</style>
