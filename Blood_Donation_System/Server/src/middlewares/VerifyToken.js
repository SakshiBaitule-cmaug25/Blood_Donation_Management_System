import jwt from "jsonwebtoken";

export function verifyToken(request, response, next){
 
 
    const authHeader= request.get('Authorization');

    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, '12345',(error, payload) => {
            if (error) {
                return response.status(401).send({ message: 'Token is invalid' });
            }else{
              next();
        }
        });
    }else{
        response.status(401).send({ message: 'Token is missing' });
    }
}
