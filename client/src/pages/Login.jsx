//YXOUHVSaaiuDBGCr
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Eye, EyeClosed, EyeOff, Loader2 } from 'lucide-react'
import { useLoginUserMutation, useRegisterUserMutation } from '@/features/api/authApi'
import { toast } from 'sonner'

const Login = () => {
    const [password, setPassword] = useState(false);
    const [signupInput, setSignupInput] = useState({
        name: "",
        email: '',
        password: ''
    });
    const [loginInput, setLoginInput] = useState({
        email: '',
        password: ''
    });

    const [registerUser,
        {
            data: registerData,
            error: registerError,
            isLoading: registerLoading,
            isSuccess: registersuccess

        }] = useRegisterUserMutation();
    const [loginUser,
        { data: loginData,
            error: loginError,
            isLoading: loginLoading,
            isSuccess: loginSuccess
        }] = useLoginUserMutation();


    const changeInputHandler = (e, type) => {
        const { name, value } = e.target;
        if (type === "signup") {
            setSignupInput({ ...signupInput, [name]: value });
        } else {
            setLoginInput({ ...loginInput, [name]: value });
        }
    };

    const checkPassword = () => {
        if (!password) {
            setPassword(true);
        } else {
            setPassword(false);
        }
    }

    const handleSubmit = async (type) => {
        const inputData = type === "signup" ? signupInput : loginInput;
        const action = type === "signup" ? registerUser : loginUser;
        await action(inputData);

    }

    useEffect(() => {
       if(registersuccess && registerData){
        setSignupInput('');
        toast.success(registerData.message || "Signup Successful")
       };

       if(registerError){
        toast.error(registerData.data.message || "Signup Failed")
       };

       if(loginSuccess && loginData){
        setLoginInput('');
        toast.success(loginData.message || "Login Successful")
       };

       if(loginError){
        toast.error(loginData.data.message || "Login Failed")
       }
    }, [loginLoading,
        registerLoading,
        loginData,  
        registerData,
        loginSuccess,  
        registersuccess])


    return (
        <div className='max-w-6xl mx-auto h-[100vh]'>
            <div className='flex justify-center items-center h-[100%]'>
                <Tabs defaultValue="login" className="w-[400px]">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="signup">Signup</TabsTrigger>
                        <TabsTrigger value="login">Login</TabsTrigger>
                    </TabsList>
                    <TabsContent value="signup">
                        <Card>
                            <CardHeader>
                                <CardTitle>SignUp</CardTitle>
                                <CardDescription>
                                    Create a new account and click signup when you're done.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name"
                                        name="name"
                                        type="text"
                                        required="true"
                                        value={signupInput.name}
                                        onChange={(e) => changeInputHandler(e, "signup")} />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email"
                                        name="email"
                                        type="email"
                                        required="true"
                                        value={signupInput.email}
                                        onChange={(e) => changeInputHandler(e, "signup")} />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="password">Password</Label>
                                    <div className='flex items-center gap-2 '>
                                        <Input id="password"
                                            type={password ? "text" : "password"}
                                            name="password"
                                            value={signupInput.password}
                                            onChange={(e) => changeInputHandler(e, "signup")} />
                                        {
                                            password ? <Eye
                                                onClick={checkPassword}
                                                className='cursor-pointer' />
                                                : <EyeOff
                                                    onClick={checkPassword}
                                                    className='cursor-pointer' />
                                        }
                                    </div>
                                </div>

                            </CardContent>
                            <CardFooter>
                                <Button
                                    disabled={registerLoading}
                                    onClick={(e) => { handleSubmit("signup") }} >
                                    {
                                        registerLoading ? (
                                            <>
                                                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please Wait
                                            </>
                                        ) : "Signup"
                                    }
                                </Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="login">
                        <Card>
                            <CardHeader>
                                <CardTitle>Login</CardTitle>
                                <CardDescription>
                                    Login your password here , After signup , you'll be logged in.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="current">Email</Label>
                                    <Input type="email"
                                        name='email'
                                        required="true"
                                        value={loginInput.email}
                                        onChange={(e) => changeInputHandler(e, "login")} />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="new">Password</Label>
                                    <div className='flex items-center gap-2'>
                                        <Input id="new"
                                            type={password ? "text" : "password"}
                                            name="password"
                                            value={loginInput.password}
                                            onChange={(e) => changeInputHandler(e, "login")}
                                        />
                                        {
                                            password ? <Eye
                                                onClick={checkPassword}
                                                className='cursor-pointer' />
                                                : <EyeOff
                                                    onClick={checkPassword}
                                                    className='cursor-pointer' />
                                        }
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    disabled={loginLoading}
                                    onClick={(e) => { handleSubmit("login") }} >
                                    {
                                        loginLoading ? (
                                            <>
                                                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please Wait
                                            </>
                                        ) : "Login"
                                    }
                                </Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>

        </div>
    )
}

export default Login