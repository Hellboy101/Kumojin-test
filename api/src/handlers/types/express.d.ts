import express from 'express';

declare module 'express-serve-static-core' {
  interface Response {
    locals: any;
  }
}