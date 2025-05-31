import { Link } from "react-router-dom";
export function HomePage() {

    return(
        <main className="h-screen bg-[url('/centerBackground.png')] bg-cover bg-center flex justify-center">
            <div className="flex w-[50%] h-full "> 
                <div className="center flex-60/100  px-[16px]">
                    <div className="flex justify-between items-center bg-[#a1e0ef] rounded-b-[30px]">
                        <div className="flex items-center ">
                            <img className="w-[150px] rounded-b-[30px]" src="/PokeIconHeader.png" />
                            <img className="w-[15%] right-[40px] relative" src="/LogoGifHeader.gif" alt=""/>
                        </div>
                        <Link className="w-[fit-content] font-['Silkscreen'] text-nowrap pr-[40px] text-[18px]" to="/sign-in">
                            Log In
                        </Link>

                    </div>
                    <img className="h-3/14 w-full rounded-[30px] my-[16px]" src="/banner.jpg" alt="" />

                    <div className="bg-[#f0f0f0c9] rounded-[30px] py-[30px] pb-[8%]">
                        <div className="flex justify-evenly">
                            <button className="  font-['Silkscreen']">
                                Home
                            </button>
                            <button className="  font-['Silkscreen']">
                                About Pokefit
                            </button>
                            <Link className="  font-['Silkscreen']" to="/leaderboard">
                                Leaderboards
                            </Link>
                            <Link className="  font-['Silkscreen']" to= "/rules">
                                Rules
                            </Link>
                        </div>
                        <div className="flex justify-end pr-[20%] py-[32px]">
                            <div className="w-[fit-content] font-['Quicksand'] font-bold" >
                                Welcome to Pokefit
                            </div>
                        </div>
                        <div className="flex justify-end pr-[20%]">
                            <div className=" w-[70%] h-fit indent-[18px] font-['Quicksand'] font-medium">
                                <img className="w-[40%] float-left mx-[12px]" src="/PokeEvolve.avif" alt=""/>
                                    Have you ever have had trouble getting fit? PokeFit is a motivational work out app. 
                                    The more you work out the stronger your Pokémon gets. This is not just a to-do list, your Pokémon will watch you workout.
                                    As you workout your Pokémon will also follow you acknowldeing your a worthy trainer!!
                                    How you might ask? Log In to find out!

                            </div>
                        </div>
                        
                        <div className="flex justify-end font-['Quicksand'] pr-[20%] font-bold my-[32px]">
                            Current Promotion
                        </div>
                        <div className="flex justify-end  pr-[20%]">  
                            <div className="w-[70%] font-['Quicksand'] font-medium flex items-center">
                                For our initial release the top player in the leaderboard (The one with the strongest Pokémon). 
                                We will be awarding the player a trophy of honor. This will be shipped to you at no cost. 
                                <img className="max-w-[30%]" src="/figure.png" alt="" />
                            </div>
                        </div>

                        <div>


                        </div>



                    </div>


                </div>



            </div>
        </main>
    )
}

