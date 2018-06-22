<template>
  <section class="section">
    <h1 class="title has-text-centered">Dashboard</h1>
    <article class="notification is-info">
      <p><p Welcome <strong></strong></p>A user must have an account and be logged in to view this page.</p>
    </article>
    
    	<div class="row">
  			 <div class=" col-md-6 col-md-offset-3">
          <input placeholder="add name" @keyup.enter="addname" type="input" v-model="name" class="input is-info" id='nametext'>  
        
         <ul>
          <li v-for="(name,key) in fireData" :key=key >
             <div  id="datadiv" >
               <h2>{{name.name}}</h2>

                <button class="button is-link" @click='editFormMode.push(key);'>Edit</button> 
                <button class="button is-danger" @click='deletename(key);'>Delete</button> 
              <br><br>                

                <input v-if='editFormMode.includes(key)' type="text" v-model='editingName[key]' @keyup.enter='editname(key)' class="form-control">
              </div>  
              

          </li>
          
        </ul>
        
       </div>

	</div>
   
  </section>
</template>

<script>
import Firebase from "firebase";
import * as firebase from 'firebase'

export default {
 name:'addNames',
  data () {
     return {
      names:[],
      name:null,
      fireData:null,
      editingname:[],
      editFormMode:[]
    }
  },
  methods:{
    addname(){
      this.names.push(this.name);
      firebase.database().ref('names').push({
          name:this.name
      });

      this.name=null;
      
  },

  editname(key){
    firebase.database().ref('names/'+key).set({
      name: this.editingname[key]
    })
    .then((data)=>{
      this.editingname[key]=null;
      this.editFormMode=[];
    })
  },

deletename(key){
  firebase.database().ref('names/'+key).remove();
},

  fetchFirebaseData(){
    firebase.database().ref('names').on('value',(snapshot)=>{
        this.fireData=snapshot.val();
    });
  }

  },

  created(){
    
        this.fetchFirebaseData();
        

  }
}
</script>

<style >
#nametext{
	margin-left: 400px;
}
#datadiv
{

	margin-left: 450px;
}
.input{
    max-width: 30%;
}
.button.is-link{
	
}
</style>
