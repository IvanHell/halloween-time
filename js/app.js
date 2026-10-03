(function() {
  const monthNames = ["ENE","FEB","MAR","ABR","MAY","JUN","JUL","AGO","SEP","OCT","NOV","DIC"];
  
  const wreath = document.querySelector('.wreath');
  const wreathSize = 320;
  const centerX = wreathSize / 2;
  const centerY = wreathSize / 2;
  const radius  = 125;

  // OCT arriba (12 en punto), meses en sentido horario
  const monthAngleOffset = -90;
  const angleStep = 30;

  for (let i = 0; i < 12; i++) {
    const angleDeg = monthAngleOffset + (i - 9) * angleStep;
    const angleRad = angleDeg * Math.PI / 180;

    const x = centerX + radius * Math.cos(angleRad);
    const y = centerY + radius * Math.sin(angleRad);

    const label = document.createElement('span');
    label.className = 'month-label' + (i === 9 ? ' oct' : '');
    label.textContent = monthNames[i];
    label.style.left = x + 'px';
    label.style.top  = y + 'px';

    wreath.appendChild(label);
  }

  // ============================================================
  // Generar 12 bayas equitativamente (una por mes)
  // ============================================================
  const berryRadius = 148; // un poco más afuera que las etiquetas

  for (let i = 0; i < 12; i++) {
    const angleDeg = monthAngleOffset + (i - 9) * angleStep;
    const angleRad = angleDeg * Math.PI / 180;

    const x = centerX + berryRadius * Math.cos(angleRad);
    const y = centerY + berryRadius * Math.sin(angleRad);

    const berry = document.createElement('div');
    berry.className = 'berry';
    berry.style.left = (x - 5.5) + 'px'; // centrar (mitad del ancho 11px)
    berry.style.top  = (y - 5.5) + 'px';

    // Destacar un poco la de octubre
    if (i === 9) {
      berry.style.width = '13px';
      berry.style.height = '13px';
      berry.style.boxShadow = '0 0 10px rgba(196, 30, 58, 0.8), inset -1px -1px 2px #400';
    }

    wreath.appendChild(berry);
  }

  function updateClock() {
    const now = new Date();
    const currentYear = now.getFullYear();
    
    let halloween = new Date(currentYear, 9, 31);
    if (now > halloween) {
      halloween = new Date(currentYear + 1, 9, 31);
    }

    const diffMs = halloween - now;
    const daysLeft = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));

    const daysStr = daysLeft.toString().padStart(3, '0');
    document.getElementById('digit1').textContent = daysStr[0];
    document.getElementById('digit2').textContent = daysStr[1];
    document.getElementById('digit3').textContent = daysStr[2];

    // Manecilla del mes
    const currentMonth = now.getMonth();
    const monthBaseAngle = monthAngleOffset + (currentMonth - 9) * angleStep;
    
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const dayOfMonth = now.getDate();
    const monthProgress = (dayOfMonth - 1) / daysInMonth;
    const extraAngle = monthProgress * angleStep;

    const monthAngle = monthBaseAngle + extraAngle;
    document.getElementById('monthHand').style.transform = `rotate(${monthAngle}deg)`;

    // Manecilla de días
    const dayMod = daysLeft % 31;
    const dayAngle = ((31 - dayMod) / 31) * 360;
    document.getElementById('dayHand').style.transform = `rotate(${dayAngle}deg)`;
  }

  updateClock();
  setInterval(updateClock, 60000);
  window.updateClock = updateClock;
})();