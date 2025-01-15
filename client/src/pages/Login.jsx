//YXOUHVSaaiuDBGCr
import React, { useState } from 'react'
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
import { Eye, EyeClosed, EyeOff } from 'lucide-react'

const Login = () => {
    const [password, setPassword] = useState(false);
    const [signupInput, setSignupInput] = useState({
        name: "",
        email: '',
        password: ''
    });
    const[loginInput , setLoginInput] = useState({
        email :'',
        password:''
    });

    const handleInputChange = (e) => {
        setSignupInput({ ...signupInput, [e.target.name]: e.target.value })
    };
    const handleLoginChange =(e)=>{
        setLoginInput({ ...loginInput , [e.target.name] : e.target.value})
    };

    const checkPassword = () => {
        if (!password) {
            setPassword(true);
        } else {
            setPassword(false);
        }
    }

    const handleSubmit =(type)=>{
        const inputData = type === "signup" ? signupInput : loginInput ;
        console.log(inputData);
        
        }
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
                                        onChange={handleInputChange} />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email"
                                        name="email"
                                        type="email"
                                        required="true"
                                        value={signupInput.email}
                                        onChange={handleInputChange} />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="password">Password</Label>
                                    <div className='flex items-center gap-2 '>
                                        <Input id="password"
                                            type={password ? "text" : "password"}
                                            name="password"
                                            value={signupInput.password}  
                                            onChange={handleInputChange} />
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
                                <Button onClick={(e)=>{handleSubmit("signup")}} >Signup</Button>
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
                                           name = 'email'
                                           required="true"
                                           value={loginInput.email}
                                           onChange={handleLoginChange} />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="new">Password</Label>
                                   <div className='flex items-center gap-2'>
                                   <Input id="new" 
                                           type={password ? "text" : "password"}
                                           name="password"
                                           value={loginInput.password}
                                           onChange={handleLoginChange}
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
                                <Button onClick={(e)=>{handleSubmit("login")}} >Login</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>

        </div>
    )
}

export default Login