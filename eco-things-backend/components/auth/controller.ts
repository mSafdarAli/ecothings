import { NextFunction, Request, Response } from '../../__types';
import { BaseController } from '../../core';
import { collections } from '../../database/db';
import UserHelper from '../../helpers/user';



export default class AuthController extends BaseController {
  public __component: string = "auth";
  public login = async (req: Request, res: Response): Promise<Response> => {
    const FormBody: { email: string, password: string } = req.body;
    const user = await collections.users?.findOne({ email: FormBody.email });
    if (user) {
      const password = this.passwordEn(FormBody.password, user.salt);
      if (password.password === user.password) {
        const token = await UserHelper.updateToken(user._id);
        return this.json(res, 200, null, "Login successfull", token);
      }
    }
    return this.jsonError(res, 400, this.__component, "Login information is wrong");
  }

  public register = async (req: Request, res: Response): Promise<Response> => {
    try {
      const Validationrules = {
        name: global['config'].commonRules.name,
        password: global['config'].commonRules.password.push('confirmed'),
        email: global['config'].commonRules.email,
        terms: "required"
      }
      const formErrors = await this.validateForm(req.body, Validationrules);
      const FormBody = this.getFormFields(req.body, Validationrules);
      if (!formErrors) {
        const password = this.passwordEn(FormBody.password);
        const role = await collections.roles?.findOne({ name: "User" });
        if (role) {
          FormBody["roleId"] = role._id;
        }
        await collections.users?.insertOne({ ...FormBody, ...password });
        return this.json(res, 200, null, "Registered Successfully");
      } else {
        return this.jsonError(res, 400, this.__component, formErrors);
      }
    } catch (error) {
      return this.jsonError(res, 400, this.__component, "wrong", error);
    }
  }

  public forgetPassword = async (req: Request, res: Response): Promise<Response> => {
    const FormBody: { email: string } = req.body;
    const user = await collections.users?.findOne({ email: FormBody.email });
    if (user) {
      // let message_subject = 'Reset Password';
      // const html =  '<body> Password Reset Link <a href="/resetPassword">Click to Reset Your Password</body>';
      // const mailOptions = {
      //   from: 'lovelaunch.com',
      //   to: 'FormBody.email',
      //   subject: message_subject,
      //   text: html
      // };
      // const email = new EmailHelper();
      // await email.sendEmail(mailOptions);
      return this.json(res, 200, { link: "reset-password" }, "Check your Email");
    }
    return this.jsonError(res, 400, this.__component, "Email is incorrect");
  }
  public resetPassword = async (req: Request, res: Response): Promise<Response> => {
    const FormBody: { email: string, confirm_password: string } = req.body;
    const user = await collections.users?.findOne({ email: FormBody.email });
    if (user) {
      const password = this.passwordEn(FormBody.confirm_password,user.salt);
      await collections.users?.updateOne({ _id: user._id }, { $set: password } );
      return this.json(res, 200, null, "Password updates successfully");
    }
    return this.jsonError(res, 400, this.__component, "Password is not updated");
  }

  public notFoundHandler = (req: Request, res: Response, next: NextFunction): Response => {
    return this.json(res, 404)
  }
}