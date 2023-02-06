<template>
   <h1>DNJ Test Project</h1>
   <h2>
      To see discussions, Go to
      <router-link :to="{ name: 'discussions' }">discussions</router-link>
      page
   </h2>

   <div class="mt-5">
      <p class="mb-1">
         I use
         <a href="https://pravatar.cc/" target="_blank">this site</a>
         for users avatar, like below
      </p>
      <img src="https://i.pravatar.cc/150?img=2" alt="user avater" class="img-fluid img-thumbnail" />
   </div>
</template>

<script>
export default {
   name: "Home"
}
</script>

<style scoped>

</style>