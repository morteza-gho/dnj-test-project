<template>

  <loading v-if="isLoading"></loading>

  <section v-else class="discussions-wrapper">

    <div class="new-discussion">
      <div class="avatar">
        <img src="../../assets/images/morteza.jpg" alt="" />
      </div>
      <form class="new-discussion-form">
        <input type="text" class="form-control" placeholder="Start a discussion">
      </form>
    </div>

    <div class="discussions">

      <discussion-item v-for="discussion in discussions" :key="discussion.id" :data="discussion"></discussion-item>

      <!-- <div v-for="discussion in discussions" :key="discussion.id" class="discussion-item"
        :class="discussion.replies?.length ? 'has-reply' : ''">

        <div class="avatar">
          <img :src="discussion.user.avatar" :alt="discussion.user.name" />
        </div>

        <div class="content">

          <header class="header">
            <span class="username">{{ discussion.user.name }}</span>
            <span class="time">{{ timeStampToDate(discussion.date) }}</span>
          </header>

          <div class="text">{{ discussion.text }}</div>

          <footer class="actions">
            <span :class="`action-item likes ${discussion.iLikedIt ? 'liked' : ''}`">
              <b class="icon bi bi-hand-thumbs-up-fill"></b>
              <span class="count">{{ discussion.likes }}</span>
            </span>
            <span class="action-item reply-btn">Reply</span>
          </footer>

          <div v-if="discussion.replies?.length" class="replyes">

            <div v-for="reply in discussion.replies" class="discussion-item">

              <div class="avatar">
                <img :src="reply.user.avatar" :alt="reply.user.name" />
              </div>

              <div class="content">
                <header class="header">
                  <span class="username">{{ reply.user.name }}</span>
                  <span class="time">{{ timeStampToDate(reply.date) }}</span>
                </header>

                <div class="text">{{ reply.text }} </div>

                <footer class="actions">
                  <span :class="`action-item likes ${reply.iLikedIt ? 'liked' : ''}`">
                    <b class="icon bi bi-hand-thumbs-up-fill"></b>
                    <span class="count">{{ reply.likes }}</span>
                  </span>
                </footer>
              </div>
            </div>

          </div>

        </div>

      </div> -->
      <!-- end of .discussion-item -->

    </div>
    <!-- END OF .discussions -->




  </section>

</template>
<script setup>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import Loading from '../Global/Loading.vue';
import {timeStampToDate} from "../../functions.js"
import DiscussionItem from './DiscussionItem.vue';

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