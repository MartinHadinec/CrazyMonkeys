const jmenoInput = document.getElementById('jmeno');
const prijmeniInput = document.getElementById('prijmeni');
const cisloInput = document.getElementById('cislo');
const zpravaInput = document.getElementById('zprava');

const jmenoError = document.getElementById('jmeno-error');
const prijmeniError = document.getElementById('prijmeni-error');
const cisloError = document.getElementById('cislo-error');
const zpravaError = document.getElementById('zprava-error');

jmenoInput.addEventListener('keydown', (event) => {
    if (event.key === ' ' && (event.target.selectionStart === 0 || event.target.selectionStart === event.target.value.length)) {
      event.preventDefault(); // Zamezíme přidání mezery na začátku nebo konci pole
    }
  });

const validateJmeno = () => {
     const jmeno = jmenoInput.value.trim();
    if (jmeno.length <=2) {
        jmenoError.textContent = 'Jméno je krátké';
        return false;
    } else if(jmeno.length >=12){
        jmenoError.textContent = 'Vaše jméno je moc dlouhé';
        return false;
    } else {
        jmenoError.textContent= '';
        return true; 
    }
};

prijmeniInput.addEventListener('keydown', (event) => {
    if (event.key === ' ' && (event.target.selectionStart === 0 || event.target.selectionStart === event.target.value.length)) {
      event.preventDefault(); // Zamezíme přidání mezery na začátku nebo konci pole
    }
  });

const validatePrijmeni = () => {
        const prijmeni = prijmeniInput.value.trim();
    if (prijmeni.length <=2) {
        prijmeniError.textContent = 'Příjmení je krátké';
        return false;
    } else if (prijmeni.length >=18) {
        prijmeniError.textContent = 'Vaše příjmení je moc dlouhé';
        return false;
    } else {
        prijmeniError.textContent = '';
        return true;
    }
};

cisloInput.addEventListener('keydown', (event) => {
    if (event.key === ' ' && (event.target.selectionStart === 0 || event.target.selectionStart === event.target.value.length)) {
      event.preventDefault(); // Zamezíme přidání mezery na začátku nebo konci pole
    }
  });
  

const validateCislo = () => {
    const cisloRegex = /^(\+420\s*)?[0-9]{3}\s*[0-9]{3}\s*[0-9]{3}$/
                // (\+420\s*)? - Tato část povolí volitelný řetězec "+420" s volitelnými mezerami \s*.
                //[0-9]{3} - Toto znamená tři číslice (trojciferný blok).
                //\s* - Toto povolí volitelné mezery mezi bloky čísel.
    if (!cisloRegex.test(cisloInput.value.trim())) {
        cisloError.textContent = 'Telefonní číslo musí obsahovat pouze číslice a musí jich být 9';
        return false;
    } else {
        cisloError.textContent = '';
        return true;
    }
};

zpravaInput.addEventListener('keydown', (event) => {
    if (event.key === ' ' && (event.target.selectionStart === 0 || event.target.selectionStart === event.target.value.length)) {
      event.preventDefault(); // Zamezíme přidání mezery na začátku nebo konci pole
    }
  });

const validateZprava = () => {
    if (zpravaInput.value.trim().length <=2) {
        zpravaError.textContent = 'Zpráva je příliš krátká';
        return false;
    } else {
        zpravaError.textContent = '';
        return true;
    }
};

const handleSubmit = (event) => {
    event.preventDefault();

    const isJmenoValid = validateJmeno();
    const isPrijmeniValid = validatePrijmeni();
    const isCisloValid = validateCislo();
    const isZpravaValid = validateZprava();

    if (isJmenoValid && isPrijmeniValid && isCisloValid && isZpravaValid) {
        document.querySelector('form').submit();
    }
};

jmenoInput.addEventListener('blur', validateJmeno);
prijmeniInput.addEventListener('blur', validatePrijmeni);
cisloInput.addEventListener('blur', validateCislo);
zpravaInput.addEventListener('blur', validateZprava);

const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);
