<template>
    <div class="flex justify-center w-full mt-8">
        <div class="flex flex-col gap-4">
            <h2 class="font-semibold text-2xl mt-4">Path not found</h2>
            <div class="flex w-full justify-center">
                <p class="text-xl text-gray-500">The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
            </div>
            <div>
                <button @click="$router.push({ name: 'home' })" class="bg-sky-500  px-4 py-2 rounded-lg text-white text-2xl font-semibold">Go to Home</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'HandleError403Page'
}
</script>