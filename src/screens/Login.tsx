import { useMutation } from '@apollo/client'
import {
  faFacebookSquare,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import gql from 'graphql-tag'
import { SubmitHandler, useForm } from 'react-hook-form'
import styled from 'styled-components'
import AuthLayout from '../components/auth/AuthLayout'
import BottomBox from '../components/auth/BottomBox'
import Button from '../components/auth/Button'
import FormBox from '../components/auth/FormBox'
import FormError from '../components/auth/FormError'
import Input from '../components/auth/Input'
import Separator from '../components/auth/Separator'
import PageTitle from '../components/PageTitle'
import routes from '../routes'
import { login, loginVariables, login_login } from '../__generated__/login'

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`

interface IForm {
  username: string
  password: string
  result: string
}

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    setError,
  } = useForm<IForm>({ mode: 'onChange' })
  const onCompleted = (data: login) => {
    const {
      login: { ok, error, token },
    } = data
    if (!ok) {
      setError('result', { message: error || undefined })
    }
  }
  const [login, { loading }] = useMutation<login, loginVariables>(
    LOGIN_MUTATION,
    { onCompleted }
  )

  const onSubmitValid: SubmitHandler<IForm> = (data) => {
    if (loading) {
      return
    }
    const { username, password } = getValues()
    login({ variables: { username, password } })
  }

  return (
    <AuthLayout>
      <PageTitle title='Login' />
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faInstagram} size='3x' />
        </div>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register('username', {
              required: 'Username is required',
              minLength: {
                value: 5,
                message: 'Username should be longer than 5 chars.',
              },
            })}
            name='username'
            type='text'
            placeholder='Username'
            hasError={Boolean(errors.username?.message)}
          />
          <FormError message={errors.username?.message} />
          <Input
            {...register('password', { required: 'Password is reuiqred.' })}
            name='password'
            type='password'
            placeholder='Password'
            hasError={Boolean(errors.password?.message)}
          />
          <FormError message={errors.password?.message} />
          <Button
            type='submit'
            value={loading ? 'Loading...' : 'Log in'}
            disabled={!isValid || loading}
          />
          <FormError message={errors.result?.message} />
        </form>
        <Separator />
        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>Log in with Facebook</span>
        </FacebookLogin>
      </FormBox>
      <BottomBox
        cta="Dont' have an account?"
        linkText='Sign up'
        link={routes.signUp}
      />
    </AuthLayout>
  )
}

export default Login
