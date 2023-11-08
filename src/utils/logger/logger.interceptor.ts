import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, catchError, tap } from 'rxjs';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    // const request = context.getArgByIndex(0);
    // const [req, res] = context.getArgs();
    // console.log('Obser:', req.params);

    const userAgent = context.switchToHttp().getRequest().headers['user-agent'];
    console.log(userAgent);

    const now = Date.now();

    return next.handle().pipe(
      tap((data)=>{
        //console.log(`Despues de : ${Date.now() - now}ms`, `data: ${data}`, userAgent);
      }),
      catchError( err => {
        console.log(err);
        throw err;
      })
    )

    // return next.handle();
  }
}
