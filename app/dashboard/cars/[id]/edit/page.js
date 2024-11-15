"use client"

import React, { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation' // Import useParams
import { db } from '@/utils/db'
import { CarModel } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import {
 Dialog,
 DialogContent,
 DialogDescription,
 DialogHeader,
 DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { LoaderCircle, X } from 'lucide-react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'

const EditCar = () => {
 const router = useRouter()
 const { id } = useParams() 

 const [carId, setCarId] = useState(null)
 const [car, setCar] = useState(null)
 const [modelName, setModelName] = useState('')
 const [carName, setCarName] = useState('')
 const [description, setDescription] = useState('')
 const [tags, setTags] = useState([])
 const [currentTag, setCurrentTag] = useState('')
 const [images, setImages] = useState([])
 const [loading, setLoading] = useState(false)
 const [error, setError] = useState('')

 useEffect(() => {
   if (id) {
     setCarId(id)
     fetchCar(id)
   }
 }, [id])

 const fetchCar = async (id) => {
   try {
     const [car] = await db.select().from(CarModel).where(eq(CarModel.id, id))
     if (car) {
       setCar(car)
       setModelName(car.modelName)
       setCarName(car.carName)
       setDescription(car.description)
       setTags(JSON.parse(car.tags || '[]'))
       setImages(
         (car.images || []).map(img => ({
           preview: `data:${img.type};base64,${img.data}`,
           base64: img.data,
           type: img.type
         }))
       )
     }
   } catch (error) {
     console.error('Error fetching car:', error)
   }
 }

 const convertToBase64 = (file) => {
   return new Promise((resolve, reject) => {
     const reader = new FileReader();
     reader.readAsDataURL(file);
     reader.onload = () => resolve(reader.result);
     reader.onerror = error => reject(error);
   });
 }

 const handleImageChange = async (e) => {
  const files = Array.from(e.target.files)
  if (files.length + images.length > 10) {
    setError('You can only upload up to 10 images')
    return
  }
  
  const validFiles = files.filter(file => {
    const isValidType = ['image/jpeg', 'image/png', 'image/webp'].includes(file.type)
    const isValidSize = file.size <= 5 * 1024 * 1024 // 5MB limit
    return isValidType && isValidSize
  })

  if (validFiles.length !== files.length) {
    setError('Some files were skipped. Please ensure all files are images (JPEG, PNG, WebP) under 5MB.')
  }

  const processedImages = await Promise.all(
    validFiles.map(async (file) => {
      const preview = URL.createObjectURL(file)
 
      const base64String = await convertToBase64(file)
      
      return {
        preview,
        base64: base64String,
        type: file.type
      }
    })
  )
  
  setImages([...images, ...processedImages])
 }

 const removeImage = (index) => {
  const newImages = [...images]
  URL.revokeObjectURL(newImages[index].preview)
  newImages.splice(index, 1)
  setImages(newImages)
}

const handleAddTag = (e) => {
  e.preventDefault()
  const trimmedTag = currentTag.trim()
  if (trimmedTag && !tags.includes(trimmedTag) && tags.length < 5) {
    setTags([...tags, trimmedTag])
    setCurrentTag('')
  } else if (tags.length >= 5) {
    setError('Maximum 5 tags allowed')
  }
}

const removeTag = (tagToRemove) => {
  setTags(tags.filter(tag => tag !== tagToRemove))
}

 const onSubmit = async (e) => {
   e.preventDefault()
   setLoading(true)
   setError('')

   try {
     const imagesData = images.map(img => ({
       data: img.base64,
       type: img.type
     }))

     await db.update(CarModel)
       .set({
         modelName,
         carName,
         description,
         tags: JSON.stringify(tags),
         images: imagesData,
       })
       .where(eq(CarModel.id, carId))

     router.push('/dashboard')
     router.refresh()
   } catch (error) {
     console.error('Error updating car:', error)
     setError(error.message || 'Failed to update car. Please try again.')
   } finally {
     setLoading(false)
   }
 }

 if (!car) {
   return (
     <div className="flex items-center justify-center min-h-[200px]">
       <LoaderCircle className="h-8 w-8 animate-spin" />
     </div>
   )
 }

 return (
   <div>
     <Dialog open={true}>
       <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
         <DialogHeader>
           <DialogTitle className="text-2xl">Edit Car</DialogTitle>
           <DialogDescription>
             <form onSubmit={onSubmit} className="space-y-6">
               {error && (
                 <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
                   {error}
                 </div>
               )}

               <div>
                 <label className="block text-sm font-medium mb-1">Model Name</label>
                 <Input 
                   placeholder="Ex. Camry" 
                   required
                   maxLength={50}
                   value={modelName}
                   onChange={(e) => setModelName(e.target.value)}
                 />
               </div>

               <div>
                 <label className="block text-sm font-medium mb-1">Car Name</label>
                 <Input 
                   placeholder="Ex. Toyota Camry 2023 SE" 
                   required
                   maxLength={100}
                   value={carName}
                   onChange={(e) => setCarName(e.target.value)}
                 />
               </div>

               <div>
                 <label className="block text-sm font-medium mb-1">Description</label>
                 <Textarea 
                   placeholder="Describe the car..." 
                   required
                   maxLength={2000}
                   value={description}
                   onChange={(e) => setDescription(e.target.value)}
                 />
                 <span className="text-xs text-gray-500">
                   {description.length}/2000 characters
                 </span>
               </div>

               <div>
                 <label className="block text-sm font-medium mb-1">Tags (max 5)</label>
                 <div className="flex gap-2 mb-2">
                   <Input 
                     placeholder="Add tags (e.g., SUV, Toyota, Luxury)"
                     value={currentTag}
                     onChange={(e) => setCurrentTag(e.target.value)}
                     maxLength={30}
                     disabled={tags.length >= 5}
                   />
                   <Button 
                     type="button" 
                     onClick={handleAddTag}
                     disabled={tags.length >= 5}
                   >
                     Add
                   </Button>
                 </div>
                 <div className="flex flex-wrap gap-2">
                   {tags.map((tag, index) => (
                     <Badge 
                       key={index} 
                       variant="secondary"
                       className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                       onClick={() => removeTag(tag)}
                     >
                       {tag} <X className="h-3 w-3 ml-1" />
                     </Badge>
                   ))}
                 </div>
               </div>

               <div>
                 <label className="block text-sm font-medium mb-1">
                   Images (Max 10, JPEG/PNG/WebP, max 5MB each)
                 </label>
                 <Input 
                   type="file" 
                   accept="image/jpeg,image/png,image/webp" 
                   multiple
                   onChange={handleImageChange}
                   disabled={images.length >= 10 || loading}
                 />
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                   {car.images.map((image, index) => (
                     <div key={index} className="relative group">
                       <div className="relative h-40 w-full">
                         <Image
                           src={image.preview}
                           alt={`Preview ${index + 1}`}
                           fill
                           className="object-cover rounded-lg"
                         />
                       </div>
                       <button
                         type="button"
                         onClick={() => removeImage(index)}
                         disabled={loading}
                         className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                       >
                         <X className="h-4 w-4" />
                       </button>
                     </div>
                   ))}
                 </div>
               </div>

               <div className="flex gap-5 justify-end mt-6">
                 <Button
                   type="button"
                   variant="ghost"
                   onClick={() => router.push('/dashboard')}
                   disabled={loading}
                 >
                   Cancel
                 </Button>
                 <Button type="submit" disabled={loading}>
                   {loading ? (
                     <>
                       <LoaderCircle className="animate-spin mr-2" />
                       Updating Car
                     </>
                   ) : 'Update Car'}
                 </Button>
               </div>
             </form>
           </DialogDescription>
         </DialogHeader>
       </DialogContent>
     </Dialog>
   </div>
 )
}

export default EditCar