<template>
  <div class="new-discussion">
    <div class="avatar">
      <img :src="CURRENT_USER.avatar" :alt="CURRENT_USER.name" />
    </div>
    <form class="new-discussion-form position-relative" @submit.prevent="onSubmit">
      <input type="text" class="form-control" :placeholder="placeholder" v-model="newDisText" :disabled="isLoading"
        ref="newDisRef">
      <small class="text-danger error-text" v-if="isRequired">Required</small>
      <span class="spinner-grow spinner-grow-sm loading" v-if="isLoading"></span>
      <b class="bi bi-x cancel-reply" title="cancel reply" @click="cancelReply" v-if="parent"></b>
    </form>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, onMounted } from 'vue';
import { CURRENT_USER } from '../../Constants';
import { uuid } from '../../functions';
import { useToast } from "vue-toast-notification";
import { useStore } from 'vuex';

const props = defineProps({
  placeholder: {
    type: String,
    default: 'Start a discussion'
  },
  parent: Object
});

const emits = defineEmits(['cancelReply'])

const toast = useToast();
const store = useStore();

const newDisText = ref('');
const newDisRef = ref(null);
const isRequired = ref(false);
const isLoading = ref(false);

onMounted(() => {
  newDisRef.value.focus(); // focus to input on reply
});

const onSubmit = async () => {
  if (!newDisText.value) {
    isRequired.value = true;
  } else {
    isRequired.value = false;

    const dataModel = {
      id: uuid(),
      text: newDisText.value,
      date: new Date(),
      likes: 0,
      iLikedIt: false,
      user: CURRENT_USER,
      replies: []
    }

    try {
      isLoading.value = true;
      if (props.parent) {
        // // TODO Because there is need server actions to reply discussions, this action just do in client and not save to db
        dataModel.is_reply = true;
        props.parent.replies.push(dataModel);
      } else {
        await store.dispatch('addDiscussion', dataModel);
      }
      isLoading.value = false;
      newDisText.value = '';
      emits('cancelReply'); // use emit to close reply form
    } catch (err) {
      toast.error(err.message)
    }

  }
}; // onSubmit

const cancelReply = () => {
  emits('cancelReply'); // use emit to close reply form
};

</script>

<style scoped>
.error-text {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 12px;
}

.loading {
  position: absolute;
  top: 12px;
  right: 10px;
}

.cancel-reply {
  position: absolute;
  top: 5px;
  right: 10px;
  font-size: 20px;
  color: gray;
  cursor: pointer;
}
</style>