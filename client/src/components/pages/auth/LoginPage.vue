<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <h1>Форма авторизации</h1>
        <div class="col-md-6 offset-md-3">
          <form>
           <div class="form-group">
            <label for="login">Email</label>
            <input type="text"
                   class="form-control"
                   id="login"
                   name="password"
                   autofocus
                   placeholder="mail@mail.ru"
            />
           </div>
            <div class="form-group">
              <label for="password">Пароль</label>
              <input type="password"
                     id="password"
                     name="password"
                     class="form-control"
              />
            </div>
            <button type="button" class="btn btn-primary">Войти</button>
          </form>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
    export default {
        name: 'LoginPage'
    }
</script>

<style scoped>

</style>
