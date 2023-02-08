<template>
  <div class="new-discussion">
    <div class="avatar">
      <img :src="CURRENT_USER.avatar" :alt="CURRENT_USER.name" />
    </div>
    <form class="new-discussion-form position-relative" @submit.prevent="onSubmit">
      <input type="text" class="form-control" placeholder="Start a discussion" v-model="newDisText" :disabled="isLoading">
      <small class="text-danger error-text" v-if="isRequired">Required</small>
      <span class="spinner-grow spinner-grow-sm loading" v-if="isLoading"></span>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { CURRENT_USER } from '../../Constants';
import { uuid } from '../../functions';
import { useToast } from "vue-toast-notification";
import { useStore } from 'vuex';

const toast = useToast();
const store = useStore();

const newDisText = ref('');
const isRequired = ref(false);
const isLoading = ref(false);

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
      user: CURRENT_USER
    }

    try {
      isLoading.value = true;
      await store.dispatch('addDiscussion', dataModel);
      isLoading.value = false;
      newDisText.value = '';
    } catch (err) {
      toast.error(err.message)
    }

  }
}

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
</style>