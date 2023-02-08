<template >

  <div class="discussion-item" :class="data.replies?.length ? 'has-reply' : ''">

    <div class="avatar">
      <img :src="data.user.avatar" :alt="data.user.name" />
    </div>

    <div class="content">

      <header class="header">
        <span class="username">{{ data.user.name }}</span>
        <span class="time">{{ timeStampToDate(data.date) }}</span>
      </header>

      <div class="text">{{ data.text }}</div>

      <footer class="actions">

        <span :class="`action-item likes ${data.iLikedIt ? 'liked' : ''}`" @click="likeDislike">
          <b class="icon bi bi-hand-thumbs-up-fill"></b>
          <span class="count">{{ data.likes }}</span>
        </span>
        <span class="action-item text-btn" v-if="showReply">Reply</span>
        <span class="action-item text-btn text-danger" v-if="CURRENT_USER.id == data.user.id"
          @click="deleteDiscussion(data)">Delete</span>


      </footer>

      <div v-if="data.replies?.length" class="replyes">
        <discussion-item v-for="reply in data.replies" :key="reply.id" :data="reply"
          :show-reply="false"></discussion-item>
      </div>

    </div>
  </div>

</template>

<script setup>

import { defineProps } from "vue";
import { timeStampToDate } from "../../functions.js"
import { BASE_URL, CURRENT_USER } from './../../Constants';
import { useToast } from "vue-toast-notification";
import axios from "axios";
import store from "../../store";

const toast = useToast();

const props = defineProps({
  data: Object,
  showReply: {
    type: Boolean,
    default: true
  }
});

const likeDislike = async () => {
  try {
    const dataModel = Object.assign(props.data, {
      likes: props.data.iLikedIt ? props.data.likes -= 1 : props.data.likes += 1, // add||minus likes count
      iLikedIt: !props.data.iLikedIt
    });
    if (!props.data.is_reply) {
      // TODO Because there is need server actions to like||dislike discussions, this action just fire for main discussions, not for eplies
      const { status, data } = await axios.put(`${BASE_URL}/discussions/${props.data.id}`, dataModel);
    }
  } catch (err) {
    toast.error(err.message)
  }
}

const deleteDiscussion = async () => {
  if (window.confirm('Are you sure to delete this discussion?')) {
    await store.dispatch('deleteDiscussion', props.data.id);
  }
}

</script>