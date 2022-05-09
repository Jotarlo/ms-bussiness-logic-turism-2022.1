import {AuthenticationStrategy} from '@loopback/authentication';
import {/* inject, */ BindingScope, injectable} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import fetch from 'node-fetch';
import parseBearerToken from 'parse-bearer-token';
import {GeneralData} from '../config/general-data';

@injectable({scope: BindingScope.TRANSIENT})
export class AdminStrategy implements AuthenticationStrategy {
  name: string = 'adminStrategy';

  constructor(/* Add @inject to inject parameters */) {}

  async authenticate(request: Request): Promise<UserProfile | undefined> {
    console.log('En estrategia admin');
    let token = parseBearerToken(request);
    if (token) {
      let adminRoleId = GeneralData.administratorRole;
      let url_token = GeneralData.token_validator_url;
      let r = '';
      let body = {
        token: token,
        roleId: adminRoleId,
      };
      await fetch(url_token, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json'},
      }).then(async (res: any) => {
        r = await res.text();
        console.log(r);
      });
      console.log('R: ' + r);

      switch (r) {
        case 'OK':
          let perfil: UserProfile = Object.assign({
            admin: 'OK',
          });
          return perfil;

        case 'KO':
          throw new HttpErrors[401]('El rol del token no es válido');
        case 'EX':
          throw new HttpErrors[402](
            'Hay un error verificando el token, posiblemente ha expirado',
          );

        default:
          throw new HttpErrors[404](
            'Ha ocurrido un fallo en la validación del token',
          );
          break;
      }
    } else {
      throw new HttpErrors[401]('La request no tiene un token');
    }
  }
}
