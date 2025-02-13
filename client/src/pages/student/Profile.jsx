import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Course from './Course'
import { useLoadUserQuery, useUpdateUserMutation } from '@/features/api/authApi'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'


const Profile = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [profilePhoto, setProfilePhoto] = useState("");
    const { data, isLoading , refetch } = useLoadUserQuery();
    console.log(data);
    
    const [updateUser, { data: updateUserData, isLoading: updateUserIsLoading,isError, error , isSuccess }] = useUpdateUserMutation();
    
    const onChangeHandler = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setProfilePhoto(file);
        }
    }
    
    const updateUserHandler = async() => {
        if (!name && !profilePhoto) {
            toast.error("Please enter a name or upload a profile photo.");
            return;
        }
        const formData = new FormData();
        formData.append("name",name);
        formData.append("profilePhoto",profilePhoto);
        
        await updateUser(formData);
        
    };
    useEffect(() => {
        refetch();
      }, []);
    
    
    useEffect(()=>{
        if(isSuccess){
            refetch();
            toast.success(data.message || "Profile updated");
        }
        if(isError){
            toast.error(error.message || "Couldn't update")
        }
    },[error,updateUserData,isSuccess,isError]);

    if (isLoading) return <h1>Profile is isLoading</h1>
    const {user} = data ;

    return (
        <div className='max-w-4xl mx-auto my-24 px-4 '>
            <h1 className='font-bold text-2xl text-center md:text-left'>PROFILE</h1>
            <div className='flex flex-col md:flex-row items-center md:items-start gap-8 my-5'>
                <div className='flex flex-col items-center' >
                    <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4">
                        <AvatarImage src={user?.photoURL || "https://github.com/shadcn.png"} alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
                <div>
                    <div className='mb-2'>
                        <h1 className='font-semibold text-gray-900 dark:text-gray-100'>
                            Name :
                            <span className='font-normal text-gray-700 dark:text-gray-300 ml-2'>{user?.name}</span>
                        </h1>
                    </div>
                    <div className='mb-2'>
                        <h1 className='font-semibold text-gray-900 dark:text-gray-100'>
                            Email :
                            <span className='font-normal text-gray-700 dark:text-gray-300 ml-2'>{user?.email}</span>
                        </h1>
                    </div>
                    <div className='mb-2'>
                        <h1 className='font-semibold text-gray-900 dark:text-gray-100'>
                            Role :
                            <span className='font-normal text-gray-700 dark:text-gray-300 ml-2'>{user?.role.toUpperCase()}</span>
                        </h1>
                    </div>
                    <Dialog>
                        <DialogTrigger asChild >
                            <Button size="sm" className="mt-2" >Edit Profile</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    Edit Profile
                                </DialogTitle>
                                <DialogDescription>
                                    Make Changes to your profile. Click save when you;re done.
                                </DialogDescription>
                            </DialogHeader>
                            <div className='grid gap-4 py-4'>
                                <div className='grid grid-cols-4 items-center gap-4'>
                                    <Label>Name</Label>
                                    <Input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="name"
                                        className="col-span-3" />
                                </div>
                                <div className='grid grid-cols-4 items-center gap-4'>
                                    <Label>Profile Photo</Label>
                                    <Input
                                        type="file"
                                        onChange={onChangeHandler}
                                        accept="image/*"
                                        className="col-span-3" />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button disabled={updateUserIsLoading} onClick={updateUserHandler}>
                                    {
                                        updateUserIsLoading ? (
                                            <>
                                                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                                            </>
                                        ) : "Save Changes"
                                    }
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <div>
                <h1 className='text-xl'>Your Courses </h1>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5'>
                    {
                        user?.enrolledCourses.length === 0 ? <h1 className='text-lg font-medium text-center md:text-left'>You haven't enrolled yet</h1> : (
                            user?.enrolledCourses.map((course) => <Course
                                course={course} key={course._id} />)
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Profile