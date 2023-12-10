<template>
  <div class="menu-body">
    <div class="logo">
      <img src="../assets/logo.svg" alt="Logo" />
      <div class="label">Stock</div>
    </div>

    <div class="btns-wrapper">
      <router-link class="button" to="/import">
        <span class="material-icons"> file_upload </span>
        <span class="text">Заявки на отгрузку</span>
      </router-link>

      <router-link class="button" to="/import">
        <span class="material-icons"> file_download </span>
        <span class="text">Заявки на склад</span>
      </router-link>

      <router-link class="button" to="/stock">
        <span class="material-icons">inventory_2</span>
        <span class="text">Склад</span>
      </router-link>

      <router-link class="button" to="/">
        <span class="material-icons">person_add</span>
        <span class="text">Персонал</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.menu-body {
  height: 100%;
  width: 13%;
  background-color: var(--grey);
  position: absolute;
}
.logo {
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 1vw;
  margin: 1rem 1rem auto 1rem;

  img {
    width: 20%;
  }
  .label {
    font-size: 1.7vw;
    font-weight: bold;
    color: var(--light);
  }
}
.btns-wrapper {
  margin-top: 3vw;
  display: flex;
  flex-direction: column;
  .button {
    transition: 0.2s ease-out;
    padding: 1vw;
    text-decoration: none;
    color: var(--light);
    font-size: 1.1vw;
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 1vw;

    &:hover {
      background-color: var(--light_grey);
      transition: 0.2s ease-out;
    }
    .material-icons {
      font-size: 2.2vw;
    }
  }
}
</style>
