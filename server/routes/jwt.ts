import * as koa_jwt from 'koa-jwt';
import { secretKey } from '../config';
export const jwt = koa_jwt({ secret: secretKey });