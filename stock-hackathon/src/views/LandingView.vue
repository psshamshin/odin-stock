<template>
  <body>
    <section class="banner__section">
      <div class="logo">
        <img src="../assets/images/mgimo.png" />
      </div>
      <div class="banner__container">
        <div class="banner__content__container">
          <h1>Автоматизация торговли на маркетплейсах</h1>
          <p id="i1">
            Кейс для автоматизации фулфилмента, выполненный студентами МГИМО
          </p>
          <div class="btn1">
            <router-link class="modal-botn" to="/Auth"
              >Начать работу</router-link
            >
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="landing__container">
        <h1 class="header__h1">Тарифы</h1>
        <div class="info__container">
          <div class="con1" id="con11">
            <p id="z1">Приемка от 5.99 рублей / 1 ед.</p>
            <p id="u1">
              Услуга включает распознование, измерение веса и габаритов,
              стикерование, раскладку товара по ячейкам
            </p>
          </div>
          <div class="con1">
            <p id="z1">Отгрузка от 50 рублей / 1 ед.</p>
            <p id="u1">
              Зависит от габаритов товара и включает комплектацию, упаковку с
              материалами, доставку и сдачу в сортировочный пункт.
            </p>
          </div>

          <div class="con1" id="con11">
            <p id="z1">Хранение товара 30 рублей / м<sup>3</sup>.</p>
            <p id="u1">
              Услуга включает распознование, измерение веса и габаритов,
              стикерование, раскладку товара по ячейкам
            </p>
          </div>
          <div class="con1">
            <p id="z1">Приемка возврата 45 рублей / 1 ед.</p>
            <p id="u1">
              Услуга включает распознование, измерение веса и габаритов,
              стикерование, раскладку товара по ячейкам
            </p>
          </div>
        </div>
      </div>
    </section>

    <footer>
      <div class="landing__container">
        <h1 class="header__h1">Наша команда</h1>
        <div class="con2">
          <div id="role">
            <p>
              Капитан<br />
              <br />Бэкенд<br />
              <br />Фронтенд<br />
              <br />Фронтенд<br />
              <br />UX/UI
            </p>
          </div>
          <div id="names">
            <p>
              Шамшин Павел Сергеевич<br />
              <br />Мусин Артем Иванович<br />
              <br />Матиевич Григорий Андреевич<br />
              <br />Коляда Ирина Дмитриевна<br />
              <br />Артунян Карина Лаврентьевна
            </p>
          </div>
        </div>
      </div>
    </footer>
  </body>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
section {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 10vh;
  padding-bottom: 20px;
}

footer {
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 40px;
  color: white;
  background-color: var(--grey);
}

.banner__section {
  width: 100%;
  height: 100vh;
  position: relative;
  background: url(../assets/images/image.jpg);
  background-size: cover;
  background-position: left center;
}

.banner__container {
  width: 100%;
  padding: 0 50px;
}

.banner__content__container {
  color: white;
}

h1 {
  font-weight: 900;
}

.logo {
  width: 85px;
  height: 85px;
  position: absolute;
  top: 40px;
  right: 60px;
}
.info__container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  row-gap: 20px;
  column-gap: 20px;
}

.landing__container {
  width: 100%;
  padding: 0 25px;
  max-width: 1280px;
}

.modal-botn {
  cursor: pointer;
  background-color: var(--primary);
  color: white;
  border-radius: 10px;
  padding: 13px 20px;
  transition: 0.2s ease-out;
  font-size: 1.3vw;

  &:hover {
    background-color: white;
    color: var(--primary);
    transition: 0.2s ease-out;
  }
}
#mg {
  width: 77px;
  height: 73px;
  position: absolute;
}
a {
  text-decoration: none;
}
.mainBlock {
  display: flex;
  flex-direction: column;
}

.container {
  margin-right: 0 !important;
}
.container1 {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  padding: 18% 17% 16px 30px;

  color: var(--white);
}
.bottom {
  margin-top: 2.5%;
}

.header__h1 {
  font-size: 28px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.container2 {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: nowrap;
  padding-bottom: 2.5%;
}

.gridcont {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
}
.container3 {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: nowrap;
}
#t {
  padding: 6% 17% 25px 30px;
}
.con1 {
  border-radius: 0.4vw;
  background-color: white;
  padding: 5% 5% 5% 5%;
}
.team {
  background-color: var(--grey);
  color: var(--white);
  width: 100%;
}
.con2 {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
#role {
  padding-right: 4%;
}
#i1 {
  padding-top: 10px;
  padding-bottom: 60px;
  font-size: 1.5rem;
}
#z1 {
  font-weight: bold;
  font-size: 1.3rem;
  text-align: center;
}
#u1 {
  text-align: center;
  font-size: 0.9rem;
  padding-top: 15px;
}
h1 {
  font-size: 3rem;
}
@media (max-width: 576px) {
  h1 {
    font-size: 28pt;
    position: center center;
  }
  .banner__section {
    background-position: center center;
  }

  .logo {
    right: 10px;
  }

  .banner__container {
    padding: 0 20px;
  }
  .info__container {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
  }

  #i1 {
    font-size: 14pt;
  }
  #z1 {
    font-size: 22px;
  }
  .modal-botn {
    font-size: 14pt;
    margin: auto;
  }
  .container1 {
    background: url(../assets/images/image.jpg);
    height: 85vh;
    background-size: 85vh 85vh;
    background-position: center;
    background-repeat: no-repeat;
  }
  .container2 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-wrap: nowrap;
    padding-bottom: 2.5%;
  }

  .container3 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-wrap: nowrap;
    padding-bottom: 2.5%;
  }
  .con1 {
    border-radius: 0.4vw;
    background-color: white;
    padding: 5% 5% 5% 5%;
  }
  .con2 {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    font-size: 14px;
  }
  #con11 {
    margin-bottom: 2%;
  }
}
</style>
