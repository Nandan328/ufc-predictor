interface SuggestionMenuProps {
    suggestions: string[];
    setFighterName: (name: string) => void;
    setClicked: (clicked: boolean) => void;
    setFighter: (fighter: string) => void;
}

export function SuggestionMenu({ suggestions, setFighterName, setFighter, setClicked }:SuggestionMenuProps) {
    const handleSuggestionClick = (suggestion:string) => {
        setFighterName(suggestion);
        setFighter(suggestion);
        setClicked(false);
    };

    return (
      <>
        <div className="mt-7 absolute z-10 border max-h-50 w-50 overflow-scroll scrollbar-hide bg-black text-white">
          <ul>
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="cursor-pointer hover:bg-neutral-600 text-center m-1"
              >
                {suggestion}
                <hr />
              </li>
              
            ))}
          </ul>
        </div>
      </>
    );
}