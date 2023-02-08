<template>

  <loading v-if="isLoading"></loading>

  <section class="discussions-wrapper" v-else>

    <new-discussion></new-discussion>

    <div class="discussions">
      <discussion-item v-for="discussion in discussions" :key="discussion.id" :data="discussion"></discussion-item>
    </div>

  </section>

</template>
<script setup>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import Loading from '../Global/Loading.vue';
import DiscussionItem from './DiscussionItem.vue';
import NewDiscussion from './NewDiscussion.vue';

const store = useStore();
const discussions = computed(() => store.getters.allDiscussions);
const isLoading = ref(false);

const fetchDiscussions = async () => {
  isLoading.value = true;
  await store.dispatch('fetchDiscussions');
  isLoading.value = false;
};

onMounted(() => {
  fetchDiscussions();
});

</script>