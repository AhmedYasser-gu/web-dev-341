<template>
  <b-container>
    <b-link :to="{ name: 'MovieDetails', params: {id: movie._id}}" replace>
      <b-img
        id="mediaListPicture"
        v-bind:src="movie.poster"
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
