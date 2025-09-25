Пет проект двойной аунтентификации

Работа ведётся на мок‑данных (без реального бэкенда).

- **Моки**: `src/services/mockApi.ts`
- **Хуки запросов**: `src/services/authServices.ts`
- **Формы**: `src/components/Form/FormLogin/`, `src/components/Form/Form2FA/`

## Быстрый старт

```bash
npm i
npm run dev
```

## Как работают моки

- Логин: `mockLoginApi(email, password)`
  - Успешный кейс для перехода на 2FA: `email: user@user.com`, `password: password123`
  - Возможные ошибки возвращаются формата `{ status, message }`
  - Успех: `{ success: true, requires2FA: true }`
- 2FA: `mock2FAApi(authCode)`
  - Валидный код: `000000`
  - Ошибки: длина не 6 символов либо неверный код

## Пример потока

1. Введите `user@user.com` / `password123` на форме логина.
2. На экране 2FA введите `000000` и нажмите Continue — получите `{ success: true }`.
3. При ошибках увидите сообщение из мок‑ответа.

## Короткий пример использования

```ts
// фрагмент Auth.tsx
const loginMutation = useLoginMutation()
const twoFAMutation = useTwoFAMutation()

const handleLogin = async (values: ILoginAuth) => {
	const res = await loginMutation.mutateAsync(values)
	if ('status' in res) return
	if (res.requires2FA) setStep('2fa')
}

const check2FA = async (code: string) => {
	const res = await twoFAMutation.mutateAsync({ authCode: code })
	// обработка res или ошибки
}
```
