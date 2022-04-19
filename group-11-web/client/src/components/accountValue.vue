<template>
  <b-container>
    <div>{{ getMovie(movie) }}</div>
    <b-link :to="{ name: 'MovieDetails', params: {id: movieItem._id}}" replace>
      <b-img
        id="mediaListPicture"
        v-bind:src="movieItem.poster"
      />
    </b-link>
  </b-container>
</template>

<script>
import { Api } from '@/Api'
export default {
  name: 'movieItem',
  props: ['movie'],
  methods: {
    getMovie(id) {
      Api.get(`/movies/${id}`).then((response) => {
        this.movieItem = response.data
      })
    }
  },
  data() {
    return {
      movieItem: ''
    }
  }
}
</script>
