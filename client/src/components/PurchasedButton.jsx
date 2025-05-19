import React, { useEffect } from 'react'
import { Button } from './ui/button'
import { useCreateCheckOutSessionMutation } from '@/features/api/purchaseApi'
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const PurchasedButton = ({courseId}) => {
  const[createCheckOutSession,{data,isLoading,isSuccess,isError,error}] = useCreateCheckOutSessionMutation();

 
  useEffect(()=>{
     if(isSuccess){
       if(data?.url){
        window.location.href = data?.url
       }else{
        toast.error('Invalid response from server');
       }
     }

     if(isError){
      toast.error(error?.data?.message  || "Failed to create checkout");
     }
  },[data,isSuccess,isError,error])


  const purchaseCourseHandler = async ()=>{
    await createCheckOutSession(courseId);
  }

  return (
        <Button disabled={isLoading}
        onClick={purchaseCourseHandler}         
        className="w-full">
          {
            isLoading ? (    
              <>
              
              <Loader2 className='mr-2 h-4 w-4 animate-spin'/>
              Please wait....
              </>
            ): "Purchase Course"
            
          }
          
          </Button>
  )
}

export default PurchasedButton