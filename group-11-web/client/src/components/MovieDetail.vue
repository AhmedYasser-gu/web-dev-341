<template>
<div>
    <b-container fluid="md-5" class="movieDetails">

      <b-button class=buttonSpacing> {{movie.movieName}}</b-button>

    </b-container>
</div>
</template>

<script>
export default {
  name: 'movie-detail',
  props: ['movie']
}
</script>

<style>
.movieDetails {
  border-bottom: 4px solid red ;
  margin: 5px;
  border-color: rgb(184, 12, 12);

}
.buttonSpacing{
  margin: 5px;
  width:200px;
  height:50px;
  text-align:center;
}
</style>
