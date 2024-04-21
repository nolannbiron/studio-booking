import { z } from 'zod'

import type { TPrivateUser, TPublicUser } from '../user/user.schema'

export const ZLoginBody = z.object({
	email: z.string().email(),
	password: z.string()
})

export type TLoginBody = z.infer<typeof ZLoginBody>

export const ZRegisterBody = z.object({
	email: z.string().email(),
	firstName: z.string().optional(),
	lastName: z.string().optional(),
	password: z.string()
})

export type TRegisterBody = z.infer<typeof ZRegisterBody>

export const ZForgotPassword = z.object({
	email: z.string().email()
})

export type TForgotPassword = z.infer<typeof ZForgotPassword>

export const ZResetPassword = z.object({
	password: z.string(),
	token: z.string()
})

export type TResetPassword = z.infer<typeof ZResetPassword>

export const ZVerifyEmail = z.object({
	token: z.string()
})

export type TVerifyEmail = z.infer<typeof ZVerifyEmail>

export type TVerifyEmailReply = { success: true } | { success: false; message: unknown }
export type TVerifyEmailRequest = {
	Body: TVerifyEmail
	Reply: TVerifyEmailReply
}

type TBaseUserReply = {
	success: true
	token: string
	refreshToken: string
}

export type TPublicUserReply = TBaseUserReply & {
	user: TPublicUser
}

export type TPrivateUserReply = TBaseUserReply & {
	user: TPrivateUser
}

export type TForgotPasswordReply = { success: true } | { success: false; message: unknown }

export type TForgotPasswordRequest = {
	Body: TForgotPassword
	Reply: TForgotPasswordReply
}

export type TResetPasswordReply = { success: true } | { success: false; message: unknown }

export type TResetPasswordRequest = {
	Body: TResetPassword
	Reply: TResetPasswordReply
}
