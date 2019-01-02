<template>
  <div class="home">
    <CreditCard/>
  </div>
</template>

<script>
// @ is an alias to /src
import CreditCard from '../components/CreditCard'
export default {
  name: 'Home',
  components: {
   CreditCard
  }
}
</script>