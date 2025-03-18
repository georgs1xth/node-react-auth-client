import { FC, useContext, useEffect, useState } from 'react'
import LoginForm from './components/LoginForm'
import { Context } from './main';
import { observer } from 'mobx-react-lite';
import { IUser } from './models/IUser';
import UserService from './services/UserService';

const App: FC = () => {

  const {store} = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([])
  useEffect(() => {
    if(localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [])

  async function getUsers() {
    try {
      const data = await UserService.fetchUsers()
      setUsers(data);
    } catch (e) {
      console.log(e);
    }
  }

  if (store.isLoading) {
    return <div>Загрузка...</div>
  }

  if(!store.isAuth) {
    return (
      <LoginForm/>
    )
  }

  return (
    <div>
      <h1>{store.isAuth ? `Пользователь авторизован ${store.user.email}` : "АВТОРИЗУЙТЕСЬ"}</h1>
      <h1>{store.user.isActivated ? 'Аккаунт активирован' : 'Подтвердите аккаунт!'}</h1>
      <button onClick={() => {store.logout()}}>Выйти</button>
      <div>
        <button onClick={getUsers}>Получить пользователей</button>
      </div>
      {users.map(user => (
        <div key={user.email}>
          {user.id}
          {user.email}
          {user.isActivated && "Activated"}
        </div>
      ))}
    </div>
  )
}

export default observer(App);