<template>
  <div class="profile-wrapper">
    <div class="profile">
      <div class="profile-logo">
        <!-- <img src="../assets/user_photo.svg" alt="Exit" /> -->
      </div>
      <div class="profile-info">
        <div class="profile-info__name">{{ name }}</div>
        <div class="profile-info__role">{{ role }}</div>
      </div>
      <div class="profile-exit-btn" @click="logOut">
        <img src="../assets/exit_icon.svg" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  methods: {
    logOut() {
      this.$emit("logOut");
    },
  },
};
</script>

<style lang="scss" scoped>
.profile {
  &-wrapper {
    display: flex;
    justify-content: end;
  }
  margin-top: 1vw;
  top: 1vw;
  right: 1vw;
  display: flex;
  justify-content: space-between;
  gap: 1.1vw;
  align-items: center;
  font-size: 1.1vw;

  &-logo {
    img {
      width: 4vw;
    }
  }

  &-exit-btn {
    cursor: pointer;
    transition: 0.2s ease-out;

    &:hover {
      transform: translate(0.1vw, -0.1vw);
      transition: 0.2s ease-out;
    }
  }
  &-info {
    &__name {
      font-weight: bold;
      margin-bottom: 0.4vw;
    }
  }
}
</style>
