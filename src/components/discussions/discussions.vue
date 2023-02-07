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

      <div class="discussion-item has-reply">

        <div class="avatar">
          <img src="../../assets/images/morteza.jpg" alt="" />
        </div>

        <div class="content">

          <header class="header">
            <span class="username">Bessie Copper</span>
            <span class="time">2d ago</span>
          </header>

          <div class="text">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores repellendus mollitia nesciunt numquam.
          </div>

          <footer class="actions">
            <span class="action-item likes liked">
              <b class="icon bi bi-hand-thumbs-up-fill"></b>
              <span class="count">5</span>
            </span>
            <span class="action-item reply-btn">Reply</span>
          </footer>

          <div class="replyes">

            <div class="discussion-item">

              <div class="avatar">
                <img src="../../assets/images/morteza.jpg" alt="" />
              </div>

              <div class="content">
                <header class="header">
                  <span class="username">Bessie Copper</span>
                  <span class="time">2d ago</span>
                </header>

                <div class="text">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores repellendus mollitia nesciunt
                  numquam.
                </div>

                <footer class="actions">
                  <span class="action-item likes">
                    <b class="icon bi bi-hand-thumbs-up-fill"></b>
                    <span class="count">0</span>
                  </span>
                </footer>
              </div>
            </div>

            <div class="discussion-item">

              <div class="avatar">
                <img src="../../assets/images/morteza.jpg" alt="" />
              </div>

              <div class="content">
                <header class="header">
                  <span class="username">Bessie Copper</span>
                  <span class="time">2d ago</span>
                </header>

                <div class="text">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores repellendus mollitia nesciunt
                  numquam.
                </div>

                <footer class="actions">
                  <span class="action-item likes liked">
                    <b class="icon bi bi-hand-thumbs-up-fill"></b>
                    <span class="count">3</span>
                  </span>
                </footer>
              </div>
            </div>

          </div>
          <!-- end of .replyes -->

        </div>

      </div>
      <!-- end of .discussion-item -->

      <div class="discussion-item">

        <div class="avatar">
          <img src="../../assets/images/morteza.jpg" alt="" />
        </div>

        <div class="content">

          <header class="header">
            <span class="username">Bessie Copper</span>
            <span class="time">2d ago</span>
          </header>

          <div class="text">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores repellendus mollitia nesciunt numquam.
          </div>

          <footer class="actions">
            <span class="action-item likes">
              <b class="icon bi bi-hand-thumbs-up-fill"></b>
              <span class="count">2</span>
            </span>
            <span class="action-item reply-btn">Reply</span>
          </footer>

        </div>

      </div>
      <!-- end of .discussion-item -->

      <div class="discussion-item">

        <div class="avatar">
          <img src="../../assets/images/morteza.jpg" alt="" />
        </div>

        <div class="content">

          <header class="header">
            <span class="username">Bessie Copper</span>
            <span class="time">2d ago</span>
          </header>

          <div class="text">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores repellendus mollitia nesciunt numquam.
          </div>

          <footer class="actions">
            <span class="action-item likes">
              <b class="icon bi bi-hand-thumbs-up-fill"></b>
              <span class="count">2</span>
            </span>
            <span class="action-item reply-btn">Reply</span>
          </footer>

        </div>

      </div>
      <!-- end of .discussion-item -->

    </div>
    <!-- END OF .discussions -->

  </section>

</template>
<script setup>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import Loading from '../Global/Loading.vue';

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